import { useState, useRef, useEffect } from 'react';
import { useCMS } from './useCMS';
import { DEFAULT_PROFILE } from './cmsStore';
import AdminAuthGate from './AdminAuthGate';
import ProjectEditorModal from './ProjectEditorModal';
import { optimizeImageFile } from '@/utils/imageOptimizer';

const PRESET_ARTBOARDS = [
  '/image/Image Gallery/Artboard 1.webp',
  '/image/Image Gallery/Artboard 2.webp',
  '/image/Image Gallery/Artboard 3.webp',
  '/image/Image Gallery/Artboard 4.webp',
  '/image/Image Gallery/Artboard 5.webp',
  '/image/Image Gallery/Artboard 6.webp',
  '/image/Image Gallery/Artboard 7.webp',
  '/image/Image Gallery/Artboard 8.webp',
  '/image/Image Gallery/Artboard 9.webp',
  '/image/Image Gallery/Artboard 10.webp',
  '/image/Image Gallery/Artboard 11.webp',
  '/image/Image Gallery/Artboard 12.webp',
];

const PRESET_LOGOS = [
  { name: 'Anjarai Petti', logo: '/image/Logos/2@4x.webp' },
  { name: 'Miniacres', logo: '/image/Logos/Artboard 5.webp' },
  { name: 'Do Well Living', logo: '/image/Logos/Artboard 6.webp' },
  { name: 'Thomas Bakers', logo: '/image/Logos/Colored.webp' },
  { name: 'CSIR India', logo: '/image/Logos/CSIR-Logo-With-Tagline-Seleceted-Bilingual.webp' },
  { name: 'The Siragugal Groups', logo: '/image/Logos/Logo.webp' },
  { name: 'Lani', logo: '/image/Logos/logo hm.webp' },
  { name: 'Mo Elixir', logo: '/image/Logos/Mo Elixir.webp' },
  { name: 'EBS', logo: '/image/Logos/edwin bs logo.webp' },
  { name: 'Neeri', logo: '/image/Logos/neeri_logo.webp' },
  { name: 'Quill', logo: '/image/Logos/quill main logo.webp' },
  { name: 'Unique', logo: '/image/Logos/unique.webp' },
];

const AdminDashboard = ({ onNavigateHome }) => {
  const cms = useCMS();
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'gallery' | 'brands' | 'profile' | 'sync'
  const [editingProject, setEditingProject] = useState(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [copiedSection, setCopiedSection] = useState(null);

  // Gallery inputs
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const galleryFileRef = useRef(null);

  // Brand inputs & editing states
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandLogo, setNewBrandLogo] = useState('');
  const [editingBrandIndex, setEditingBrandIndex] = useState(null);
  const [editBrandName, setEditBrandName] = useState('');
  const [editBrandLogo, setEditBrandLogo] = useState('');
  const [brandSavedToast, setBrandSavedToast] = useState(false);
  const brandLogoFileRef = useRef(null);
  const editBrandLogoFileRef = useRef(null);

  // Profile inputs & state
  const profileFileRef = useRef(null);
  const [profileSavedToast, setProfileSavedToast] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const currentProfile = { ...DEFAULT_PROFILE, ...(cms.profile || {}) };
  const [profileForm, setProfileForm] = useState(currentProfile);

  // Keep profile form in sync when cms.profile updates
  useEffect(() => {
    if (cms.profile) {
      setProfileForm({ ...DEFAULT_PROFILE, ...cms.profile });
    }
  }, [cms.profile]);

  // Backup file ref
  const importFileRef = useRef(null);

  if (!cms.isAuthenticated) {
    return (
      <AdminAuthGate
        onLogin={(pin) => cms.login(pin)}
        onCancel={onNavigateHome}
      />
    );
  }

  // Filtered projects
  const filteredProjects = cms.projects.filter((p) => {
    const matchesSearch =
      (p.client || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleCopyCode = (type) => {
    let code = '';
    if (type === 'portfolio') code = cms.generatePortfolioDataCode();
    else if (type === 'gallery') code = cms.generateGalleryImagesCode();
    else if (type === 'brands') code = cms.generateBrandsCode();
    else if (type === 'profile') code = cms.generateProfileDataCode();
    navigator.clipboard.writeText(code);
    setCopiedSection(type);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const handleDownloadBackup = () => {
    const jsonStr = cms.exportBackupJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `harry-designs-cms-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = cms.importBackupJSON(event.target.result);
      if (res.success) {
        alert('CMS backup restored successfully!');
      } else {
        alert(`Error importing backup: ${res.error}`);
      }
    };
    reader.readAsText(file);
  };

  const handleGalleryUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const optimized = await optimizeImageFile(file, 1600, 1600, 0.85);
      cms.addGalleryImage(optimized);
    } catch {
      const reader = new FileReader();
      reader.onload = (event) => {
        cms.addGalleryImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrandLogoUpload = async (file, isEdit = false) => {
    if (!file) return;
    try {
      const optimized = await optimizeImageFile(file, 800, 800, 0.9);
      if (isEdit) {
        setEditBrandLogo(optimized);
      } else {
        setNewBrandLogo(optimized);
      }
    } catch {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (isEdit) {
          setEditBrandLogo(event.target.result);
        } else {
          setNewBrandLogo(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartEditBrand = (brand, index) => {
    setEditingBrandIndex(index);
    setEditBrandName(brand.name || '');
    setEditBrandLogo(brand.logo || '');
  };

  const handleSaveBrandEdit = (e) => {
    e?.preventDefault();
    if (!editBrandName.trim() || !editBrandLogo.trim()) {
      alert('Brand name and logo image are both required.');
      return;
    }
    cms.updateBrand(editingBrandIndex, {
      name: editBrandName.trim(),
      logo: editBrandLogo.trim(),
    });
    setEditingBrandIndex(null);
    setBrandSavedToast(true);
    setTimeout(() => setBrandSavedToast(false), 2500);
  };

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingPhoto(true);
      const optimizedDataUrl = await optimizeImageFile(file, 1000, 1200, 0.88);
      const updated = { ...profileForm, image: optimizedDataUrl };
      setProfileForm(updated);
      cms.updateProfile(updated);
      setProfileSavedToast(true);
      setTimeout(() => setProfileSavedToast(false), 2500);
    } catch (err) {
      console.error('[CMS] Failed to process profile image:', err);
      alert('Could not process selected image. Please try another file.');
    } finally {
      setIsUploadingPhoto(false);
      if (profileFileRef.current) {
        profileFileRef.current.value = '';
      }
    }
  };

  const handleSaveProfile = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    cms.updateProfile(profileForm);
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#f5f4f0] text-[#1e1e20] bg-dot-grid font-sans">
      {/* Top Studio Bar */}
      <header className="sticky top-0 z-30 bg-[#f5f4f0]/92 backdrop-blur-md border-b border-black/[0.08] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onNavigateHome}
            className="font-display font-bold text-base sm:text-lg text-[#1e1e20] hover:text-[#8b151b] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span className="h-2 w-2 rounded-full bg-[#8b151b] animate-pulse" />
            <span>Harry Designs</span>
            <span className="text-[10px] font-mono font-medium uppercase tracking-widest text-[#1e1e20]/60 bg-white/80 border border-black/[0.08] px-2.5 py-0.5 rounded-full shadow-2xs">
              Studio CMS
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onNavigateHome}
            className="px-4 py-2 rounded-full border border-black/15 bg-white/70 hover:bg-white text-xs font-sans font-medium text-[#1e1e20] transition-all shadow-2xs hover:scale-105 cursor-pointer"
          >
            View Live Site ↗
          </button>
          <button
            onClick={() => cms.logout()}
            className="px-4 sm:px-5 py-2 rounded-full bg-[#1e1e20] hover:bg-[#8b151b] text-[#f5f4f0] text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            Lock Studio
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
        {/* Navigation Tabs - Modern curved pill switcher */}
        <div className="flex flex-wrap items-center gap-2 pb-6 mb-8 border-b border-black/[0.08]">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-[#1e1e20] text-[#f5f4f0] shadow-md scale-105 font-semibold'
                : 'bg-white/80 hover:bg-white text-[#1e1e20]/75 border border-black/[0.08] shadow-2xs font-medium'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                activeTab === 'projects' ? 'bg-[#FC7A69]' : 'bg-black/20'
              }`}
            />
            <span>Selected Work ({cms.projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'gallery'
                ? 'bg-[#1e1e20] text-[#f5f4f0] shadow-md scale-105 font-semibold'
                : 'bg-white/80 hover:bg-white text-[#1e1e20]/75 border border-black/[0.08] shadow-2xs font-medium'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                activeTab === 'gallery' ? 'bg-[#FC7A69]' : 'bg-black/20'
              }`}
            />
            <span>Hero Carousel ({cms.galleryImages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('brands')}
            className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'brands'
                ? 'bg-[#1e1e20] text-[#f5f4f0] shadow-md scale-105 font-semibold'
                : 'bg-white/80 hover:bg-white text-[#1e1e20]/75 border border-black/[0.08] shadow-2xs font-medium'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                activeTab === 'brands' ? 'bg-[#FC7A69]' : 'bg-black/20'
              }`}
            />
            <span>Client Logos ({cms.brands.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-[#1e1e20] text-[#f5f4f0] shadow-md scale-105 font-semibold'
                : 'bg-white/80 hover:bg-white text-[#1e1e20]/75 border border-black/[0.08] shadow-2xs font-medium'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                activeTab === 'profile' ? 'bg-[#FC7A69]' : 'bg-black/20'
              }`}
            />
            <span>Founder Profile &amp; Photo</span>
          </button>

          <button
            onClick={() => setActiveTab('sync')}
            className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'sync'
                ? 'bg-[#1e1e20] text-[#f5f4f0] shadow-md scale-105 font-semibold'
                : 'bg-white/80 hover:bg-white text-[#1e1e20]/75 border border-black/[0.08] shadow-2xs font-medium'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                activeTab === 'sync' ? 'bg-[#FC7A69]' : 'bg-black/20'
              }`}
            />
            <span>Export &amp; Git Sync</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: SELECTED WORK (PROJECTS) */}
        {/* ========================================================= */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Action & Filter Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-white rounded-3xl border border-black/[0.08] shadow-xs">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  placeholder="Search by client or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2.5 bg-[#f5f4f0] rounded-full border border-black/10 text-xs w-60 sm:w-72 outline-none focus:border-[#8b151b] focus:bg-white transition-all font-sans"
                />

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2.5 bg-[#f5f4f0] rounded-full border border-black/10 text-xs outline-none cursor-pointer focus:border-[#8b151b] focus:bg-white transition-all font-sans"
                >
                  <option value="all">All Categories</option>
                  <option value="packaging">Packaging</option>
                  <option value="branding">Branding</option>
                  <option value="uiux">UI/UX</option>
                  <option value="brochures">Brochures</option>
                  <option value="posters">Posters</option>
                </select>
              </div>

              <button
                onClick={() => setIsCreatingProject(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#8b151b] hover:bg-[#7a161c] text-white text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer hover:scale-105"
              >
                <span>+ Add New Project</span>
              </button>
            </div>

            {/* Projects Cards List */}
            <div className="space-y-3">
              {filteredProjects.length === 0 ? (
                <div className="p-16 text-center text-[#1e1e20]/50 text-xs font-mono bg-white rounded-3xl border border-black/[0.08]">
                  No projects match your filter.
                </div>
              ) : (
                filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="p-5 sm:p-6 bg-white rounded-3xl border border-black/[0.08] shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group"
                  >
                    {/* Left: Thumbnail & Info */}
                    <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                      {/* Reorder Buttons */}
                      <div className="flex flex-col gap-1">
                        <button
                          disabled={index === 0}
                          onClick={() => cms.moveProject(index, -1)}
                          className="w-7 h-7 rounded-full bg-[#f5f4f0] hover:bg-black/10 border border-black/10 flex items-center justify-center text-[10px] text-[#1e1e20] disabled:opacity-20 cursor-pointer transition-colors"
                          title="Move up"
                        >
                          ▲
                        </button>
                        <button
                          disabled={index === cms.projects.length - 1}
                          onClick={() => cms.moveProject(index, 1)}
                          className="w-7 h-7 rounded-full bg-[#f5f4f0] hover:bg-black/10 border border-black/10 flex items-center justify-center text-[10px] text-[#1e1e20] disabled:opacity-20 cursor-pointer transition-colors"
                          title="Move down"
                        >
                          ▼
                        </button>
                      </div>

                      {/* Image Thumbnail */}
                      <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-[#1e1e20] overflow-hidden border border-black/10 flex-shrink-0 relative shadow-2xs">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.client}
                            className="h-full w-full object-cover group-hover:scale-106 transition-transform duration-500"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-[10px] text-white/40 font-mono">
                            No Img
                          </div>
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-display font-bold text-base sm:text-lg text-[#1e1e20]">
                            {project.client}
                          </span>
                          <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-[#f5f4f0] border border-black/10 text-[#1e1e20]/70 font-medium">
                            {project.category}
                          </span>
                          {project.metric && (
                            <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#8b151b] text-white">
                              {project.metric}
                            </span>
                          )}
                          {project.isFeatured !== false && (
                            <span className="text-[10px] uppercase font-mono text-[#8b151b] font-bold flex items-center gap-1">
                              <span>★</span>
                              <span>Featured</span>
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-[#1e1e20]/80 font-medium line-clamp-1">
                          {project.title}
                        </p>
                        <p className="text-xs text-[#1e1e20]/55 line-clamp-1 mt-0.5 font-sans">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Action Pills */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-black/[0.06]">
                      <button
                        onClick={() => cms.toggleFeatured(project.id)}
                        className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider border transition-all cursor-pointer ${
                          project.isFeatured !== false
                            ? 'bg-[#8b151b]/10 border-[#8b151b] text-[#8b151b]'
                            : 'border-black/15 bg-white text-[#1e1e20]/60 hover:text-[#1e1e20]'
                        }`}
                      >
                        {project.isFeatured !== false ? '★ Featured' : 'Make Featured'}
                      </button>

                      <button
                        onClick={() => setEditingProject(project)}
                        className="px-4 py-1.5 rounded-full border border-black/15 hover:border-black/30 bg-[#f5f4f0] hover:bg-white text-xs font-sans font-semibold uppercase tracking-wider text-[#1e1e20] transition-all cursor-pointer shadow-2xs hover:scale-105"
                      >
                        Edit
                      </button>

                      <a
                        href={`/project/${project.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          window.history.pushState({}, '', `/project/${project.id}`);
                          window.dispatchEvent(new PopStateEvent('popstate'));
                        }}
                        className="px-4 py-1.5 rounded-full border border-black/15 hover:border-[#8b151b] hover:text-[#8b151b] bg-[#f5f4f0] hover:bg-white text-xs font-sans font-medium uppercase tracking-wider text-[#1e1e20]/75 transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                        title="Open dedicated case study screen"
                      >
                        View Screen ↗
                      </a>

                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${project.client} — ${project.title}"?`)) {
                            cms.deleteProject(project.id);
                          }
                        }}
                        className="px-3.5 py-1.5 rounded-full border border-red-200 hover:bg-red-50 text-xs font-sans font-medium uppercase tracking-wider text-red-600 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: HERO CAROUSEL & PARALLAX GALLERY */}
        {/* ========================================================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-black/[0.08] shadow-xs p-6 sm:p-8">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8b151b] font-bold block mb-1">
                Visual Curation
              </span>
              <h3 className="font-display font-bold text-2xl text-[#1e1e20] mb-2">
                Parallax Gallery &amp; Carousel Artwork
              </h3>
              <p className="text-xs sm:text-sm text-[#1e1e20]/70 mb-6 leading-relaxed max-w-2xl font-sans">
                These images rotate smoothly across the hero parallax stage and full case archive. Upload high-res imagery, paste direct CDN URLs, or pick from pre-rendered studio artboards.
              </p>

              {/* Add image controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-black/[0.08]">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-2 font-medium">
                    Upload New Image from Computer
                  </label>
                  <input
                    type="file"
                    ref={galleryFileRef}
                    accept="image/*"
                    onChange={handleGalleryUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => galleryFileRef.current?.click()}
                    className="w-full py-4 rounded-2xl border-2 border-dashed border-black/15 hover:border-[#8b151b] text-xs font-sans font-semibold text-[#1e1e20] transition-all bg-[#f5f4f0]/60 hover:bg-white cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>📁</span>
                    <span>Choose Image File to Add</span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-2 font-medium">
                    Or Paste Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newGalleryUrl}
                      onChange={(e) => setNewGalleryUrl(e.target.value)}
                      className="flex-1 px-4 py-3 bg-[#f5f4f0] rounded-2xl border border-black/15 text-xs outline-none focus:border-[#8b151b] focus:bg-white font-mono"
                    />
                    <button
                      onClick={() => {
                        if (newGalleryUrl) {
                          cms.addGalleryImage(newGalleryUrl);
                          setNewGalleryUrl('');
                        }
                      }}
                      className="px-6 py-3 rounded-2xl bg-[#1e1e20] text-white text-xs uppercase font-sans font-semibold hover:bg-[#8b151b] transition-all cursor-pointer shadow-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Speed slider */}
              <div className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 font-medium">
                    Parallax Drift Velocity
                  </span>
                  <span className="text-xs font-mono font-bold text-[#8b151b]">
                    {cms.settings.parallaxSpeed || 0.038}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.08"
                  step="0.005"
                  value={cms.settings.parallaxSpeed || 0.038}
                  onChange={(e) =>
                    cms.updateSettings({ parallaxSpeed: parseFloat(e.target.value) })
                  }
                  className="w-full accent-[#8b151b] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#1e1e20]/50 font-mono mt-1">
                  <span>Slow &amp; Subtle (0.01)</span>
                  <span>Cinematic Default (0.038)</span>
                  <span>Fast Drift (0.08)</span>
                </div>
              </div>
            </div>

            {/* Gallery Images Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {cms.galleryImages.map((imgUrl, index) => (
                <div
                  key={`${imgUrl}-${index}`}
                  className="group relative bg-white rounded-2xl border border-black/[0.08] p-2.5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="aspect-[4/5] rounded-xl bg-[#1e1e20] overflow-hidden mb-2 relative">
                    <img
                      src={imgUrl}
                      alt={`Gallery artboard ${index + 1}`}
                      className="h-full w-full object-cover group-hover:scale-106 transition-transform duration-500"
                    />
                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[9px] font-mono text-white">
                      #{index + 1}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1">
                      <button
                        disabled={index === 0}
                        onClick={() => cms.moveGalleryImage(index, -1)}
                        className="w-6 h-6 rounded-full bg-[#f5f4f0] hover:bg-black/10 border border-black/10 flex items-center justify-center text-[10px] disabled:opacity-20 cursor-pointer"
                        title="Move earlier"
                      >
                        ◀
                      </button>
                      <button
                        disabled={index === cms.galleryImages.length - 1}
                        onClick={() => cms.moveGalleryImage(index, 1)}
                        className="w-6 h-6 rounded-full bg-[#f5f4f0] hover:bg-black/10 border border-black/10 flex items-center justify-center text-[10px] disabled:opacity-20 cursor-pointer"
                        title="Move later"
                      >
                        ▶
                      </button>
                    </div>

                    <button
                      onClick={() => cms.removeGalleryImage(index)}
                      className="text-[10px] font-mono text-red-600 hover:text-red-700 uppercase cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Preset Artboards Picker */}
            <div className="bg-white rounded-3xl border border-black/[0.08] shadow-xs p-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#1e1e20]/60 block mb-3 font-semibold">
                + Add Preloaded Artboards:
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {PRESET_ARTBOARDS.map((artboard, idx) => (
                  <button
                    key={artboard}
                    type="button"
                    onClick={() => cms.addGalleryImage(artboard)}
                    className="p-2 rounded-xl bg-[#f5f4f0] hover:bg-white border border-black/10 hover:border-[#8b151b] transition-all text-left flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105"
                  >
                    <div className="w-full aspect-[4/5] rounded-lg bg-neutral-200 overflow-hidden">
                      <img
                        src={artboard}
                        alt={`Artboard ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-mono font-medium text-[#1e1e20]/75">
                      + Artboard {idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: CLIENT LOGOS & MARQUEE */}
        {/* ========================================================= */}
        {activeTab === 'brands' && (
          <div className="space-y-6">
            {brandSavedToast && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 font-medium text-xs flex items-center justify-between">
                <span>✓ Client brand changes saved successfully! Ticker reflects live updates.</span>
                <span className="font-mono text-[10px]">Saved</span>
              </div>
            )}

            {/* Add Brand Form Card */}
            <div className="bg-white rounded-3xl border border-black/[0.08] shadow-xs p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8b151b] font-bold block mb-1">
                  Commercial Credibility
                </span>
                <h3 className="font-display font-bold text-2xl text-[#1e1e20]">
                  Client Brands &amp; Marquee Logos
                </h3>
                <p className="text-xs sm:text-sm text-[#1e1e20]/70 mt-1 font-sans">
                  Manage client brand names and vectorized transparent logos that appear in the infinite ticker and credentials fold.
                </p>
              </div>

              {/* Input Row */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-6 border-b border-black/[0.08]">
                <div className="md:col-span-4">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1.5 font-medium">
                    Client Brand Name *
                  </label>
                  <input
                    type="text"
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    placeholder="e.g. Sendra Gold"
                    className="w-full px-4 py-3 bg-[#f5f4f0] rounded-2xl border border-black/15 text-xs outline-none focus:border-[#8b151b] focus:bg-white font-sans"
                  />
                </div>

                <div className="md:col-span-5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1.5 font-medium">
                    Logo Image (URL or Upload) *
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newBrandLogo}
                      onChange={(e) => setNewBrandLogo(e.target.value)}
                      placeholder="/image/Logos/... or https://..."
                      className="w-full px-4 py-3 bg-[#f5f4f0] rounded-2xl border border-black/15 text-xs outline-none focus:border-[#8b151b] focus:bg-white font-mono"
                    />
                    <input
                      type="file"
                      ref={brandLogoFileRef}
                      accept="image/*"
                      onChange={(e) => handleBrandLogoUpload(e.target.files?.[0], false)}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => brandLogoFileRef.current?.click()}
                      className="px-4 py-3 rounded-2xl bg-[#f5f4f0] hover:bg-white border border-black/15 text-[#1e1e20] text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shadow-2xs"
                    >
                      📁 Upload
                    </button>
                  </div>
                </div>

                <div className="md:col-span-3 flex items-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (newBrandName.trim() && newBrandLogo.trim()) {
                        cms.addBrand(newBrandName.trim(), newBrandLogo.trim());
                        setNewBrandName('');
                        setNewBrandLogo('');
                        setBrandSavedToast(true);
                        setTimeout(() => setBrandSavedToast(false), 2200);
                      } else {
                        alert('Please enter both Client Brand Name and Logo.');
                      }
                    }}
                    className="w-full py-3 px-5 rounded-2xl bg-[#8b151b] hover:bg-[#7a161c] text-white text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-md text-center hover:scale-102"
                  >
                    + Add Client Brand
                  </button>
                </div>
              </div>

              {/* Quick Presets Picker */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#1e1e20]/60 block mb-2 font-medium">
                  Quick Insert Official Studio Logos:
                </span>
                <div className="flex flex-wrap gap-2">
                  {PRESET_LOGOS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        setNewBrandName(preset.name);
                        setNewBrandLogo(preset.logo);
                      }}
                      className="px-3.5 py-1.5 text-xs font-sans font-medium bg-[#f5f4f0] hover:bg-white text-[#1e1e20]/80 border border-black/[0.08] rounded-full transition-all cursor-pointer hover:border-[#8b151b] hover:scale-105 shadow-2xs"
                    >
                      + {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Existing Brands Grid with Reorder, Edit, and Delete */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {cms.brands.map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="bg-white rounded-3xl border border-black/[0.08] p-4 flex flex-col justify-between gap-3 text-center shadow-xs hover:shadow-md transition-all group"
                >
                  {/* Top Order Badges & Reorder Controls */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#1e1e20]/50 w-full border-b border-black/[0.06] pb-2">
                    <span className="font-semibold text-[#8b151b]">#{index + 1}</span>
                    <div className="flex items-center gap-1">
                      <button
                        disabled={index === 0}
                        onClick={() => cms.moveBrand(index, -1)}
                        className="w-5 h-5 rounded-full bg-[#f5f4f0] hover:bg-black/10 flex items-center justify-center disabled:opacity-20 cursor-pointer"
                        title="Move left in marquee"
                      >
                        ◀
                      </button>
                      <button
                        disabled={index === cms.brands.length - 1}
                        onClick={() => cms.moveBrand(index, 1)}
                        className="w-5 h-5 rounded-full bg-[#f5f4f0] hover:bg-black/10 flex items-center justify-center disabled:opacity-20 cursor-pointer"
                        title="Move right in marquee"
                      >
                        ▶
                      </button>
                    </div>
                  </div>

                  {/* Logo Display */}
                  <div className="h-16 w-full flex items-center justify-center p-2 bg-[#f5f4f0] rounded-2xl overflow-hidden">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-12 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>

                  {/* Brand Name */}
                  <div className="w-full">
                    <span
                      className="text-xs font-sans font-bold text-[#1e1e20] truncate block w-full"
                      title={brand.name}
                    >
                      {brand.name}
                    </span>
                  </div>

                  {/* Action Buttons: Edit and Delete */}
                  <div className="w-full pt-2 border-t border-black/[0.06] flex flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleStartEditBrand(brand, index)}
                      className="w-full py-1.5 px-3 rounded-full bg-[#1e1e20] hover:bg-[#8b151b] text-white text-[11px] font-sans font-medium uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1 shadow-2xs hover:scale-102"
                    >
                      <span>✎</span>
                      <span>Edit Name</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Remove brand "${brand.name}" from ticker?`)) {
                          cms.removeBrand(index);
                        }
                      }}
                      className="text-[10px] text-red-600 hover:text-red-700 uppercase font-sans tracking-wider hover:underline cursor-pointer py-0.5"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ==================== EDIT BRAND MODAL ==================== */}
            {editingBrandIndex !== null && (
              <div
                role="dialog"
                aria-modal="true"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1e20]/80 backdrop-blur-md"
                onClick={() => setEditingBrandIndex(null)}
              >
                <div
                  className="bg-[#f5f4f0] rounded-3xl border border-black/10 shadow-2xl p-6 sm:p-8 max-w-lg w-full space-y-6 bg-dot-grid"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between border-b border-black/[0.08] pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#8b151b] font-bold">
                        Client Marquee Editor
                      </span>
                      <h3 className="font-display font-bold text-xl text-[#1e1e20] mt-0.5">
                        Edit Client Brand #{editingBrandIndex + 1}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingBrandIndex(null)}
                      className="w-8 h-8 rounded-full bg-white hover:bg-black/5 flex items-center justify-center text-xs text-[#1e1e20]/60 hover:text-[#1e1e20] border border-black/10 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Edit Form */}
                  <form onSubmit={handleSaveBrandEdit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1.5 font-medium">
                        Client / Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={editBrandName}
                        onChange={(e) => setEditBrandName(e.target.value)}
                        placeholder="e.g. CSIR India"
                        className="w-full px-4 py-3 bg-white rounded-2xl border border-black/15 text-sm outline-none focus:border-[#8b151b] focus:ring-1 focus:ring-[#8b151b] font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1.5 font-medium">
                        Brand Logo Image (URL or Upload) *
                      </label>
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          required
                          value={editBrandLogo}
                          onChange={(e) => setEditBrandLogo(e.target.value)}
                          placeholder="/image/Logos/... or https://..."
                          className="px-4 py-3 bg-white border border-black/15 text-xs outline-none focus:border-[#8b151b] flex-1 rounded-2xl font-mono"
                        />
                        <input
                          type="file"
                          ref={editBrandLogoFileRef}
                          accept="image/*"
                          onChange={(e) => handleBrandLogoUpload(e.target.files?.[0], true)}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => editBrandLogoFileRef.current?.click()}
                          className="px-4 py-3 bg-[#1e1e20] hover:bg-[#8b151b] text-white text-xs font-sans uppercase tracking-wider rounded-2xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shadow-2xs"
                        >
                          <span>📁</span>
                          <span>Upload</span>
                        </button>
                      </div>

                      {/* Quick Presets for editing */}
                      <div className="pt-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#1e1e20]/50 block mb-1">
                          Or select preset:
                        </span>
                        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto no-scrollbar border border-black/10 p-2.5 rounded-2xl bg-white/70">
                          {PRESET_LOGOS.map((preset) => (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => {
                                setEditBrandName(preset.name);
                                setEditBrandLogo(preset.logo);
                              }}
                              className="px-2.5 py-1 text-[11px] font-sans bg-white hover:bg-[#8b151b] hover:text-white text-[#1e1e20] border border-black/10 rounded-full transition-colors cursor-pointer"
                            >
                              {preset.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Live Preview Stage */}
                    {editBrandLogo && (
                      <div className="p-3 bg-white rounded-2xl border border-black/10 space-y-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#1e1e20]/60 block font-medium">
                          Logo Preview ({editBrandName || 'Unnamed Brand'})
                        </span>
                        <div className="h-20 w-full flex items-center justify-center p-2 bg-[#f5f4f0] rounded-xl border border-black/5">
                          <img
                            src={editBrandLogo}
                            alt={editBrandName}
                            className="max-h-16 max-w-full object-contain"
                          />
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-black/[0.08]">
                      <button
                        type="button"
                        onClick={() => setEditingBrandIndex(null)}
                        className="px-5 py-2.5 rounded-full border border-black/15 text-xs font-sans font-medium text-[#1e1e20]/70 hover:text-[#1e1e20] cursor-pointer"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-full bg-[#8b151b] hover:bg-[#7a161c] text-white text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-1.5 hover:scale-105"
                      >
                        <span>✓</span>
                        <span>Save Brand Changes ↗</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: FOUNDER PROFILE & PHOTO */}
        {/* ========================================================= */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {profileSavedToast && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 font-medium text-xs flex items-center justify-between">
                <span>✓ Founder profile and portrait updated successfully! Changes reflect live across the site.</span>
                <span className="font-mono text-[10px]">Saved</span>
              </div>
            )}

            <div className="bg-white rounded-3xl border border-black/[0.08] shadow-xs p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.08] pb-5 mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8b151b] font-bold">
                    Founder Atelier Identity
                  </span>
                  <h3 className="font-display font-bold text-2xl text-[#1e1e20] mt-1">
                    Founder Profile &amp; Photo
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1e1e20]/65 mt-1 font-sans">
                    Update your founder portrait, credentials, and studio manifesto statement displayed across the site.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Reset profile to factory defaults?')) {
                        setProfileForm(DEFAULT_PROFILE);
                        cms.updateProfile(DEFAULT_PROFILE);
                      }
                    }}
                    className="px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider text-[#1e1e20]/60 hover:text-[#8b151b] border border-black/15 hover:border-[#8b151b] transition-all cursor-pointer"
                  >
                    Reset Defaults
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    className="px-6 py-2 rounded-full bg-[#8b151b] hover:bg-[#7a161c] text-white text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer hover:scale-105"
                  >
                    Save Changes →
                  </button>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Portrait Stage & Upload */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1e1e20]/80">
                    Portrait Preview
                  </div>

                  <div className="relative w-full aspect-[4/5] max-h-[380px] rounded-3xl overflow-hidden bg-neutral-100 border border-black/[0.08] shadow-md group">
                    <img
                      src={profileForm.image || '/image/hariharan.jpg'}
                      alt={profileForm.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/image/hariharan.jpg';
                      }}
                      className="w-full h-full object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/45 to-transparent flex flex-col justify-end p-5 text-white">
                      <div className="font-display text-xl font-bold">
                        {profileForm.name}
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#FC7A69] font-medium">
                        {profileForm.role}
                      </div>
                    </div>
                  </div>

                  {/* Photo Actions */}
                  <div className="space-y-3 pt-2">
                    <input
                      type="file"
                      ref={profileFileRef}
                      accept="image/*"
                      onChange={handleProfileImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={isUploadingPhoto}
                      onClick={() => profileFileRef.current?.click()}
                      className={`w-full py-3 px-5 rounded-2xl bg-[#1e1e20] hover:bg-[#8b151b] text-white text-xs font-sans font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm ${
                        isUploadingPhoto ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:scale-102'
                      }`}
                    >
                      {isUploadingPhoto ? (
                        <>
                          <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>Optimizing &amp; Saving Portrait...</span>
                        </>
                      ) : (
                        <>
                          <span>📷</span>
                          <span>Upload New Photo</span>
                        </>
                      )}
                    </button>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                        Or Image URL / Path:
                      </label>
                      <input
                        type="text"
                        value={profileForm.image}
                        onChange={(e) => setProfileForm({ ...profileForm, image: e.target.value })}
                        placeholder="/image/hariharan.jpg"
                        className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs font-mono outline-none focus:border-[#8b151b] bg-[#f5f4f0] focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Founder Metadata Inputs */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs outline-none focus:border-[#8b151b] bg-[#f5f4f0] focus:bg-white font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                        Role Title *
                      </label>
                      <input
                        type="text"
                        value={profileForm.role}
                        onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs outline-none focus:border-[#8b151b] bg-[#f5f4f0] focus:bg-white font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                        Experience Badge
                      </label>
                      <input
                        type="text"
                        value={profileForm.experience}
                        onChange={(e) => setProfileForm({ ...profileForm, experience: e.target.value })}
                        placeholder="6+ Years Practice"
                        className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs outline-none focus:border-[#8b151b] bg-[#f5f4f0] focus:bg-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                        Specialization
                      </label>
                      <input
                        type="text"
                        value={profileForm.specialization}
                        onChange={(e) => setProfileForm({ ...profileForm, specialization: e.target.value })}
                        placeholder="Packaging & Identity"
                        className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs outline-none focus:border-[#8b151b] bg-[#f5f4f0] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                        Production Rigor
                      </label>
                      <input
                        type="text"
                        value={profileForm.rigor}
                        onChange={(e) => setProfileForm({ ...profileForm, rigor: e.target.value })}
                        placeholder="ISO 12647-2 Ready"
                        className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs outline-none focus:border-[#8b151b] bg-[#f5f4f0] focus:bg-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                        Studio Location
                      </label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        placeholder="Chennai • Global Remote"
                        className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs outline-none focus:border-[#8b151b] bg-[#f5f4f0] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                        Studio Email
                      </label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        placeholder="harrydesigns99@gmail.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs outline-none focus:border-[#8b151b] bg-[#f5f4f0] focus:bg-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        placeholder="+91 86101 74188"
                        className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs outline-none focus:border-[#8b151b] bg-[#f5f4f0] focus:bg-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                      Availability Status Text
                    </label>
                    <input
                      type="text"
                      value={profileForm.statusText}
                      onChange={(e) => setProfileForm({ ...profileForm, statusText: e.target.value })}
                      placeholder="Available for Commissions"
                      className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs outline-none focus:border-[#8b151b] bg-[#f5f4f0] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                      Philosophy Quote
                    </label>
                    <textarea
                      value={profileForm.philosophy}
                      onChange={(e) => setProfileForm({ ...profileForm, philosophy: e.target.value })}
                      rows="3"
                      className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-xs outline-none focus:border-[#8b151b] bg-[#f5f4f0] focus:bg-white resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-[#8b151b] hover:bg-[#7a161c] text-white text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer hover:shadow-lg"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: EXPORT & CODE SYNC */}
        {/* ========================================================= */}
        {activeTab === 'sync' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-black/[0.08] shadow-xs p-6 sm:p-8">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8b151b] font-bold block mb-1">
                Persistence &amp; Git Sync
              </span>
              <h3 className="font-display font-bold text-2xl text-[#1e1e20] mb-2">
                Export Changes to Codebase
              </h3>
              <p className="text-xs sm:text-sm text-[#1e1e20]/70 leading-relaxed max-w-3xl mb-6 font-sans">
                All changes you make in this Studio CMS are saved immediately to browser storage and reflect live right now. To synchronize your updates into Git and production deployments, copy the generated code below or download a JSON backup.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-black/[0.08]">
                <button
                  onClick={() => handleCopyCode('portfolio')}
                  className="px-5 py-2.5 rounded-full bg-[#1e1e20] hover:bg-[#8b151b] text-white text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer hover:scale-105"
                >
                  {copiedSection === 'portfolio'
                    ? '✓ Copied portfolioData.js!'
                    : 'Copy portfolioData.js Code'}
                </button>

                <button
                  onClick={() => handleCopyCode('gallery')}
                  className="px-5 py-2.5 rounded-full bg-[#1e1e20] hover:bg-[#8b151b] text-white text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer hover:scale-105"
                >
                  {copiedSection === 'gallery'
                    ? '✓ Copied galleryImages.js!'
                    : 'Copy galleryImages.js Code'}
                </button>

                <button
                  onClick={() => handleCopyCode('brands')}
                  className="px-5 py-2.5 rounded-full bg-[#1e1e20] hover:bg-[#8b151b] text-white text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer hover:scale-105"
                >
                  {copiedSection === 'brands'
                    ? '✓ Copied Brands Code!'
                    : 'Copy Brands Code'}
                </button>

                <button
                  onClick={() => handleCopyCode('profile')}
                  className="px-5 py-2.5 rounded-full bg-[#1e1e20] hover:bg-[#8b151b] text-white text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer hover:scale-105"
                >
                  {copiedSection === 'profile'
                    ? '✓ Copied Profile Code!'
                    : 'Copy Profile Code'}
                </button>

                <button
                  onClick={handleDownloadBackup}
                  className="px-5 py-2.5 rounded-full border border-black/15 hover:border-black/30 bg-[#f5f4f0] hover:bg-white text-[#1e1e20] text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
                >
                  Download JSON Backup
                </button>

                <input
                  type="file"
                  ref={importFileRef}
                  accept=".json"
                  onChange={handleImportBackup}
                  className="hidden"
                />
                <button
                  onClick={() => importFileRef.current?.click()}
                  className="px-5 py-2.5 rounded-full border border-black/15 hover:border-black/30 bg-[#f5f4f0] hover:bg-white text-[#1e1e20] text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
                >
                  Restore from JSON
                </button>

                <button
                  onClick={() => {
                    if (
                      confirm(
                        'Are you sure you want to reset all data back to the factory verified client projects?'
                      )
                    ) {
                      cms.resetToDefaults();
                    }
                  }}
                  className="ml-auto px-4 py-2 rounded-full text-[#8b151b] text-xs font-mono uppercase tracking-wider hover:bg-red-50 transition-colors cursor-pointer"
                >
                  Reset to Factory Defaults
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Project Modal */}
      {(isCreatingProject || editingProject) && (
        <ProjectEditorModal
          project={editingProject}
          onSave={(data) => {
            if (editingProject) {
              cms.updateProject(editingProject.id, data);
            } else {
              cms.addProject(data);
            }
            setIsCreatingProject(false);
            setEditingProject(null);
          }}
          onClose={() => {
            setIsCreatingProject(false);
            setEditingProject(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
