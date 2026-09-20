import { PORTFOLIO_ITEMS, BRANDS } from '@/features/portfolio/data/portfolioData';
import { GALLERY_IMAGES } from '@/features/parallax-gallery/data/galleryImages';

const STORAGE_KEYS = {
  PROJECTS: 'harry_designs_cms_projects_v1',
  GALLERY: 'harry_designs_cms_gallery_v1',
  BRANDS: 'harry_designs_cms_brands_v1',
  SETTINGS: 'harry_designs_cms_settings_v1',
  AUTH: 'harry_designs_cms_auth_v1',
};

const DEFAULT_SETTINGS = {
  parallaxSpeed: 0.038,
  autoPlayInterval: 4000,
  studioStatus: 'Available for Select Projects Q3/Q4',
  studioMonogram: 'HS / 99',
};

const DEFAULT_PIN = 'harry2026';

// Helper to safely read from localStorage
function safeRead(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[CMS] Error reading ${key} from storage:`, err);
    return fallback;
  }
}

// Helper to safely write to localStorage
function safeWrite(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[CMS] Error writing ${key} to storage:`, err);
  }
}

// In-memory state for fast reactive access
let currentData = {
  projects: safeRead(STORAGE_KEYS.PROJECTS, PORTFOLIO_ITEMS),
  galleryImages: safeRead(STORAGE_KEYS.GALLERY, GALLERY_IMAGES),
  brands: safeRead(STORAGE_KEYS.BRANDS, BRANDS),
  settings: safeRead(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS),
  isAuthenticated: safeRead(STORAGE_KEYS.AUTH, false),
};

const listeners = new Set();

function emitChange() {
  listeners.forEach((listener) => listener());
}

export const cmsStore = {
  getSnapshot() {
    return currentData;
  },

  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  // Auth operations
  login(pin) {
    if (pin === DEFAULT_PIN) {
      currentData = { ...currentData, isAuthenticated: true };
      safeWrite(STORAGE_KEYS.AUTH, true);
      emitChange();
      return true;
    }
    return false;
  },

  logout() {
    currentData = { ...currentData, isAuthenticated: false };
    safeWrite(STORAGE_KEYS.AUTH, false);
    emitChange();
  },

  // Project operations
  addProject(newProject) {
    const nextId = currentData.projects.reduce((max, p) => Math.max(max, p.id || 0), 0) + 1;
    const projectWithId = {
      id: nextId,
      featured: true,
      year: new Date().getFullYear().toString(),
      ...newProject,
    };
    const updated = [projectWithId, ...currentData.projects];
    currentData = { ...currentData, projects: updated };
    safeWrite(STORAGE_KEYS.PROJECTS, updated);
    emitChange();
    return projectWithId;
  },

  updateProject(id, patch) {
    const updated = currentData.projects.map((item) =>
      item.id === id ? { ...item, ...patch } : item
    );
    currentData = { ...currentData, projects: updated };
    safeWrite(STORAGE_KEYS.PROJECTS, updated);
    emitChange();
  },

  deleteProject(id) {
    const updated = currentData.projects.filter((item) => item.id !== id);
    currentData = { ...currentData, projects: updated };
    safeWrite(STORAGE_KEYS.PROJECTS, updated);
    emitChange();
  },

  reorderProjects(newProjectsList) {
    currentData = { ...currentData, projects: newProjectsList };
    safeWrite(STORAGE_KEYS.PROJECTS, newProjectsList);
    emitChange();
  },

  moveProject(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= currentData.projects.length) return;
    const items = [...currentData.projects];
    const [moved] = items.splice(index, 1);
    items.splice(targetIndex, 0, moved);
    this.reorderProjects(items);
  },

  toggleFeatured(id) {
    const updated = currentData.projects.map((item) => {
      if (item.id === id) {
        return { ...item, isFeatured: item.isFeatured === false ? true : false };
      }
      return item;
    });
    currentData = { ...currentData, projects: updated };
    safeWrite(STORAGE_KEYS.PROJECTS, updated);
    emitChange();
  },

  // Gallery / Carousel operations
  addGalleryImage(url) {
    if (!url) return;
    const updated = [url, ...currentData.galleryImages];
    currentData = { ...currentData, galleryImages: updated };
    safeWrite(STORAGE_KEYS.GALLERY, updated);
    emitChange();
  },

  removeGalleryImage(index) {
    const updated = currentData.galleryImages.filter((_, i) => i !== index);
    currentData = { ...currentData, galleryImages: updated };
    safeWrite(STORAGE_KEYS.GALLERY, updated);
    emitChange();
  },

  reorderGalleryImages(newImages) {
    currentData = { ...currentData, galleryImages: newImages };
    safeWrite(STORAGE_KEYS.GALLERY, newImages);
    emitChange();
  },

  moveGalleryImage(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= currentData.galleryImages.length) return;
    const items = [...currentData.galleryImages];
    const [moved] = items.splice(index, 1);
    items.splice(target, 0, moved);
    this.reorderGalleryImages(items);
  },

  // Brand Marquee operations
  addBrand(name, logo) {
    const updated = [...currentData.brands, { name, logo }];
    currentData = { ...currentData, brands: updated };
    safeWrite(STORAGE_KEYS.BRANDS, updated);
    emitChange();
  },

  removeBrand(index) {
    const updated = currentData.brands.filter((_, i) => i !== index);
    currentData = { ...currentData, brands: updated };
    safeWrite(STORAGE_KEYS.BRANDS, updated);
    emitChange();
  },

  // Settings
  updateSettings(patch) {
    const updated = { ...currentData.settings, ...patch };
    currentData = { ...currentData, settings: updated };
    safeWrite(STORAGE_KEYS.SETTINGS, updated);
    emitChange();
  },

  // Backup, Export, Reset
  exportBackupJSON() {
    return JSON.stringify(
      {
        version: 1,
        exportedAt: new Date().toISOString(),
        projects: currentData.projects,
        galleryImages: currentData.galleryImages,
        brands: currentData.brands,
        settings: currentData.settings,
      },
      null,
      2
    );
  },

  importBackupJSON(jsonStr) {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.projects && Array.isArray(parsed.projects)) {
        currentData.projects = parsed.projects;
        safeWrite(STORAGE_KEYS.PROJECTS, parsed.projects);
      }
      if (parsed.galleryImages && Array.isArray(parsed.galleryImages)) {
        currentData.galleryImages = parsed.galleryImages;
        safeWrite(STORAGE_KEYS.GALLERY, parsed.galleryImages);
      }
      if (parsed.brands && Array.isArray(parsed.brands)) {
        currentData.brands = parsed.brands;
        safeWrite(STORAGE_KEYS.BRANDS, parsed.brands);
      }
      if (parsed.settings && typeof parsed.settings === 'object') {
        currentData.settings = { ...DEFAULT_SETTINGS, ...parsed.settings };
        safeWrite(STORAGE_KEYS.SETTINGS, currentData.settings);
      }
      emitChange();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  generatePortfolioDataCode() {
    const jsonStr = JSON.stringify(currentData.projects, null, 2);
    const brandsStr = JSON.stringify(currentData.brands, null, 2);
    return `/**
 * Generated by Harry Designs Studio CMS
 * Exported at: ${new Date().toISOString()}
 */

export const BRANDS = ${brandsStr};

export const PORTFOLIO_ITEMS = ${jsonStr};

export const FILTER_BUTTONS = [
  { label: 'All Work', value: 'all' },
  { label: 'Packaging', value: 'packaging' },
  { label: 'Branding', value: 'branding' },
  { label: 'UI/UX', value: 'uiux' },
  { label: 'Brochures', value: 'brochures' },
  { label: 'Posters', value: 'posters' },
];

export const FEATURED_COUNT = 6;
`;
  },

  generateGalleryImagesCode() {
    const imagesStr = JSON.stringify(currentData.galleryImages, null, 2);
    return `/**
 * Generated by Harry Designs Studio CMS
 * Exported at: ${new Date().toISOString()}
 */

export const GALLERY_IMAGES = ${imagesStr};
`;
  },

  resetToDefaults() {
    currentData = {
      projects: PORTFOLIO_ITEMS,
      galleryImages: GALLERY_IMAGES,
      brands: BRANDS,
      settings: DEFAULT_SETTINGS,
      isAuthenticated: currentData.isAuthenticated,
    };
    safeWrite(STORAGE_KEYS.PROJECTS, PORTFOLIO_ITEMS);
    safeWrite(STORAGE_KEYS.GALLERY, GALLERY_IMAGES);
    safeWrite(STORAGE_KEYS.BRANDS, BRANDS);
    safeWrite(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    emitChange();
  },
};

