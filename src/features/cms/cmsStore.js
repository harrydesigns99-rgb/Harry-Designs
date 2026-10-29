import { PORTFOLIO_ITEMS, BRANDS } from '@/features/portfolio/data/portfolioData';
import { GALLERY_IMAGES } from '@/features/parallax-gallery/data/galleryImages';

const STORAGE_KEYS = {
  PROJECTS: 'harry_designs_cms_projects_v4',
  GALLERY: 'harry_designs_cms_gallery_v1',
  BRANDS: 'harry_designs_cms_brands_v1',
  SETTINGS: 'harry_designs_cms_settings_v1',
  AUTH: 'harry_designs_cms_auth_v1',
  PROFILE: 'harry_designs_cms_profile_v1',
  UI_ARCHIVE: 'harry_designs_cms_ui_archive_v1',
};

// Clean legacy corrupted storage caches on init
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('harry_designs_cms_projects_v1');
    localStorage.removeItem('harry_designs_cms_projects_v2');
    localStorage.removeItem('harry_designs_cms_projects_v3');
    localStorage.removeItem('harry_portfolio_layout');
  } catch {
    // ignore
  }
}

export const DEFAULT_PROFILE = {
  name: 'Hariharan S',
  role: 'Principal Brand & Packaging Architect',
  image: '/image/hariharan.jpg',
  experience: '6+ Years Practice',
  specialization: 'Packaging & Identity',
  rigor: 'ISO 12647-2 Ready',
  location: 'Chennai • Global Remote',
  email: 'harrydesigns99@gmail.com',
  phone: '+91 86101 74188',
  philosophy: 'Translating founder ambition into shelf standout, tactile substrate finishes, and durable commercial equity.',
  statusText: 'Available for Commissions',
};

export const DEFAULT_UI_ARCHIVE = [
  {
    id: 'aurora',
    title: 'Aurora Finance Mobile',
    category: 'Fintech UI',
    tag: 'iOS / Swift',
    year: '2025',
    color: '#0f172a',
    accent: '#38bdf8',
    description: 'Neomorphic dark-mode wealth management app with haptic ledger controls and real-time biometric authorization.',
    previewType: 'ui-dark',
    metrics: '+34% D1 Retention',
    image: '/image/samples/1.webp',
  },
  {
    id: 'cloudpass',
    title: 'Cloudpass Identity Chip',
    category: 'Design System',
    tag: 'Web / React',
    year: '2024',
    color: '#1e3a8a',
    accent: '#60a5fa',
    description: 'Floating contextual credential badge with dynamic blur and encrypted SSO token verification.',
    previewType: 'ui-sky',
    metrics: '99.98% Auth Flow',
    image: '/image/samples/3.webp',
  },
  {
    id: 'chat-flow',
    title: 'Atelier Direct Messenger',
    category: 'Mobile Messaging',
    tag: 'Product Design',
    year: '2024',
    color: '#18181b',
    accent: '#f43f5e',
    description: 'Ultra-minimal tactile conversation interface with thread nesting, audio waveform scrubbers, and live press updates.',
    previewType: 'ui-chat',
    metrics: '0.4s Send Latency',
    image: '/image/samples/5.webp',
  },
  {
    id: 'diyaa-pure',
    title: 'Diyaa Pure Clean Cartons',
    category: 'Botanical Packaging',
    tag: 'CAD Dielines',
    year: '2024',
    color: '#3f2b4c',
    accent: '#c084fc',
    description: 'FSC-certified cotton paperboard unit cartons with blind debossing and plastic-free water-based barrier coatings.',
    previewType: 'ui-packaging',
    metrics: '100% Plastic-Free',
    image: '/image/Image Gallery/Artboard 4.webp',
  },
  {
    id: 'gokul-velocity',
    title: 'Aisle Standout Dashboard',
    category: 'Retail Analytics',
    tag: 'Telemetry UI',
    year: '2024',
    color: '#1c1917',
    accent: '#f59e0b',
    description: 'Grocery shelf velocity radar calculating contrast coefficients, scan zones, and 2-second shopper conversion ratios.',
    previewType: 'ui-analytics',
    metrics: '+40% Verified Lift',
    image: '/image/Image Gallery/Artboard 2.webp',
  },
  {
    id: 'neeri-bilingual',
    title: 'CSIR Bilingual Type System',
    category: 'Design Engineering',
    tag: 'Typography',
    year: '2024',
    color: '#14213d',
    accent: '#e63946',
    description: 'Uncompromising dual-script optical hierarchy unifying Devanagari Hindi and Latin letterforms across national research publications.',
    previewType: 'ui-type',
    metrics: 'ISO 12647 Calibrated',
    image: '/image/Image Gallery/Artboard 3.webp',
  },
];

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

function getInitialProjects() {
  const stored = safeRead(STORAGE_KEYS.PROJECTS, null);
  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    return PORTFOLIO_ITEMS;
  }

  // Ensure stored items are valid project objects
  const isValid = stored.every(
    (item) => item && typeof item === 'object' && typeof item.id === 'number' && typeof item.title === 'string'
  );

  // Check if standard IDs have mismatched images or swapped titles from legacy test edits
  const hasMismatchedImages = stored.some((item) => {
    if (item.id === 1 && (item.title !== 'Packaging & Label Architecture' || item.client !== 'Gokul Oils')) return true;
    if (item.id === 2 && (item.title !== 'Luxury Gold & Bullion Identity' || item.client !== 'Sendra Gold')) return true;
    if (item.id === 3 && (item.title !== 'Organic Botanical Skincare' || item.client !== 'Diyaa Pure')) return true;
    if (item.id === 4 && (item.title !== 'Bilingual Scientific Identity' || item.client !== 'CSIR India')) return true;
    if (item.id === 5 && (item.title !== 'Handcrafted Bakery Packaging' || item.client !== 'Thomas Bakers')) return true;
    if (item.id === 6 && (item.title !== 'Botanical Elixir Beverage' || item.client !== 'Mo Elixir')) return true;
    return false;
  });

  if (!isValid || hasMismatchedImages) {
    console.warn('[CMS] Corrupted or mismatched projects detected in storage. Resetting to verified PORTFOLIO_ITEMS.');
    safeWrite(STORAGE_KEYS.PROJECTS, PORTFOLIO_ITEMS);
    return PORTFOLIO_ITEMS;
  }

  return stored.map((item) => {
    const defaultItem = PORTFOLIO_ITEMS.find((p) => p.id === item.id);
    if (!defaultItem) return item;
    return {
      ...defaultItem,
      ...item,
      process: {
        ...(defaultItem.process || {}),
        ...(item.process || {}),
      },
      anatomy: item.anatomy || defaultItem.anatomy,
      systemSpecs: item.systemSpecs || defaultItem.systemSpecs,
    };
  });
}

function getInitialProfile() {
  const stored = safeRead(STORAGE_KEYS.PROFILE, null);
  if (!stored || typeof stored !== 'object') {
    return DEFAULT_PROFILE;
  }
  return { ...DEFAULT_PROFILE, ...stored };
}

// In-memory state for fast reactive access
let currentData = {
  projects: getInitialProjects(),
  galleryImages: safeRead(STORAGE_KEYS.GALLERY, GALLERY_IMAGES),
  brands: safeRead(STORAGE_KEYS.BRANDS, BRANDS),
  settings: safeRead(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS),
  profile: getInitialProfile(),
  uiArchive: safeRead(STORAGE_KEYS.UI_ARCHIVE, DEFAULT_UI_ARCHIVE),
  isAuthenticated: safeRead(STORAGE_KEYS.AUTH, false),
};

const listeners = new Set();

function emitChange() {
  listeners.forEach((listener) => listener());
}

// Cross-tab sync via storage events
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEYS.PROFILE && event.newValue) {
      try {
        const parsed = JSON.parse(event.newValue);
        currentData = {
          ...currentData,
          profile: { ...DEFAULT_PROFILE, ...parsed },
        };
        emitChange();
      } catch (err) {
        console.warn('[CMS] Storage sync error for profile:', err);
      }
    } else if (event.key === STORAGE_KEYS.PROJECTS && event.newValue) {
      try {
        currentData = { ...currentData, projects: JSON.parse(event.newValue) };
        emitChange();
      } catch (err) {
        console.warn('[CMS] Storage sync error for projects:', err);
      }
    } else if (event.key === STORAGE_KEYS.GALLERY && event.newValue) {
      try {
        currentData = { ...currentData, galleryImages: JSON.parse(event.newValue) };
        emitChange();
      } catch (err) {
        console.warn('[CMS] Storage sync error for gallery:', err);
      }
    } else if (event.key === STORAGE_KEYS.BRANDS && event.newValue) {
      try {
        currentData = { ...currentData, brands: JSON.parse(event.newValue) };
        emitChange();
      } catch (err) {
        console.warn('[CMS] Storage sync error for brands:', err);
      }
    }
  });
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

  updateBrand(index, patch) {
    if (index < 0 || index >= currentData.brands.length) return;
    const updated = [...currentData.brands];
    updated[index] = { ...updated[index], ...patch };
    currentData = { ...currentData, brands: updated };
    safeWrite(STORAGE_KEYS.BRANDS, updated);
    emitChange();
  },

  moveBrand(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= currentData.brands.length) return;
    const items = [...currentData.brands];
    const [moved] = items.splice(index, 1);
    items.splice(target, 0, moved);
    currentData = { ...currentData, brands: items };
    safeWrite(STORAGE_KEYS.BRANDS, items);
    emitChange();
  },

  reorderBrands(newBrands) {
    if (!Array.isArray(newBrands)) return;
    currentData = { ...currentData, brands: newBrands };
    safeWrite(STORAGE_KEYS.BRANDS, newBrands);
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

  // Profile operations
  updateProfile(patch) {
    const updated = { ...currentData.profile, ...patch };
    currentData = { ...currentData, profile: updated };
    safeWrite(STORAGE_KEYS.PROFILE, updated);
    emitChange();
  },

  // UI Archive operations
  updateUIArchive(items) {
    if (!Array.isArray(items)) return;
    currentData = { ...currentData, uiArchive: items };
    safeWrite(STORAGE_KEYS.UI_ARCHIVE, items);
    emitChange();
  },

  updateUIArchiveItem(index, patch) {
    if (index < 0 || index >= currentData.uiArchive.length) return;
    const updated = [...currentData.uiArchive];
    updated[index] = { ...updated[index], ...patch };
    currentData = { ...currentData, uiArchive: updated };
    safeWrite(STORAGE_KEYS.UI_ARCHIVE, updated);
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
        profile: currentData.profile,
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
      if (parsed.profile && typeof parsed.profile === 'object') {
        currentData.profile = { ...DEFAULT_PROFILE, ...parsed.profile };
        safeWrite(STORAGE_KEYS.PROFILE, currentData.profile);
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

  generateBrandsCode() {
    const brandsStr = JSON.stringify(currentData.brands, null, 2);
    return `/**
 * Generated by Harry Designs Studio CMS
 * Exported at: ${new Date().toISOString()}
 */

export const BRANDS = ${brandsStr};
`;
  },

  generateProfileDataCode() {
    const profileStr = JSON.stringify(currentData.profile, null, 2);
    return `/**
 * Generated by Harry Designs Studio CMS
 * Exported at: ${new Date().toISOString()}
 */

export const DEFAULT_PROFILE = ${profileStr};
`;
  },

  resetToDefaults() {
    currentData = {
      projects: PORTFOLIO_ITEMS,
      galleryImages: GALLERY_IMAGES,
      brands: BRANDS,
      settings: DEFAULT_SETTINGS,
      profile: DEFAULT_PROFILE,
      isAuthenticated: currentData.isAuthenticated,
    };
    safeWrite(STORAGE_KEYS.PROJECTS, PORTFOLIO_ITEMS);
    safeWrite(STORAGE_KEYS.GALLERY, GALLERY_IMAGES);
    safeWrite(STORAGE_KEYS.BRANDS, BRANDS);
    safeWrite(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    safeWrite(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
    emitChange();
  },
};

