import { useState, useRef } from 'react';
import { useCMS } from './useCMS';
import AdminAuthGate from './AdminAuthGate';
import ProjectEditorModal from './ProjectEditorModal';

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

const AdminDashboard = ({ onNavigateHome }) => {
  const cms = useCMS();
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'gallery' | 'brands' | 'sync'
  const [editingProject, setEditingProject] = useState(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [copiedSection, setCopiedSection] = useState(null);

  // Gallery inputs
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const galleryFileRef = useRef(null);

  // Brand inputs
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandLogo, setNewBrandLogo] = useState('');

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
    const code =
      type === 'portfolio'
        ? cms.generatePortfolioDataCode()
        : cms.generateGalleryImagesCode();
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

  const handleGalleryUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      cms.addGalleryImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-cloud-dancer text-eerie font-sans">
      {/* Top Studio Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-eerie/15 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onNavigateHome}
            className="font-display font-bold text-lg text-eerie hover:text-crimson transition-colors flex items-center gap-2"
          >
            <span className="h-2 w-2 rounded-full bg-crimson animate-ping" />
            Harry Designs
            <span className="text-xs font-mono font-normal uppercase tracking-widest text-eerie/50 border border-eerie/20 px-2 py-0.5">
              Studio CMS
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="px-4 py-2 border border-eerie/20 text-xs font-semibold uppercase tracking-wider text-eerie/70 hover:text-eerie hover:bg-cloud-dancer transition-colors"
          >
            View Live Site ↗
          </button>
          <button
            onClick={() => cms.logout()}
            className="px-4 py-2 bg-eerie text-white text-xs font-semibold uppercase tracking-wider hover:bg-crimson transition-colors"
          >
            Lock Studio
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-eerie/15 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-eerie text-white font-bold shadow-sm'
                : 'bg-white border border-eerie/15 text-eerie/70 hover:text-eerie'
            }`}
          >
            Selected Work ({cms.projects.length})
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-eerie text-white font-bold shadow-sm'
                : 'bg-white border border-eerie/15 text-eerie/70 hover:text-eerie'
            }`}
          >
            Hero Carousel ({cms.galleryImages.length})
          </button>

          <button
            onClick={() => setActiveTab('brands')}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'brands'
                ? 'bg-eerie text-white font-bold shadow-sm'
                : 'bg-white border border-eerie/15 text-eerie/70 hover:text-eerie'
            }`}
          >
            Client Logos ({cms.brands.length})
          </button>

          <button
            onClick={() => setActiveTab('sync')}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'sync'
                ? 'bg-eerie text-white font-bold shadow-sm'
                : 'bg-white border border-eerie/15 text-eerie/70 hover:text-eerie'
            }`}
          >
            Export & Permanent Sync
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: SELECTED WORK (PROJECTS) */}
        {/* ========================================================= */}
        {activeTab === 'projects' && (
          <div>
            {/* Action & Filter Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search projects by client or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2.5 bg-white border border-eerie/20 text-xs w-64 md:w-80 outline-none focus:border-eerie"
                />

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2.5 bg-white border border-eerie/20 text-xs outline-none cursor-pointer"
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
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-crimson hover:bg-crimson-dark text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                <span>+ Add New Project</span>
              </button>
            </div>

            {/* Projects List */}
            <div className="bg-white border border-eerie/15 divide-y divide-eerie/10">
              {filteredProjects.length === 0 ? (
                <div className="p-12 text-center text-eerie/50 text-xs font-mono">
                  No projects match your filter.
                </div>
              ) : (
                filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-cloud-dancer/30 transition-colors"
                  >
                    {/* Left: Thumbnail & Info */}
                    <div className="flex items-center gap-4">
                      {/* Order Controls */}
                      <div className="flex flex-col gap-1">
                        <button
                          disabled={index === 0}
                          onClick={() => cms.moveProject(index, -1)}
                          className="p-1 border border-eerie/15 hover:border-eerie text-[10px] disabled:opacity-20 cursor-pointer"
                          title="Move up"
                        >
                          ▲
                        </button>
                        <button
                          disabled={index === cms.projects.length - 1}
                          onClick={() => cms.moveProject(index, 1)}
                          className="p-1 border border-eerie/15 hover:border-eerie text-[10px] disabled:opacity-20 cursor-pointer"
                          title="Move down"
                        >
                          ▼
                        </button>
                      </div>

                      {/* Image Thumbnail */}
                      <div className="h-16 w-16 bg-eerie overflow-hidden border border-eerie/15 flex-shrink-0">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.client}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-[10px] text-white/30">
                            No Img
                          </div>
                        )}
                      </div>

                      {/* Text */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-display font-bold text-base text-eerie">
                            {project.client}
                          </span>
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-cloud-dancer border border-eerie/10 text-eerie/60">
                            {project.category}
                          </span>
                          {project.metric && (
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 bg-crimson text-white">
                              {project.metric}
                            </span>
                          )}
                          {project.isFeatured !== false && (
                            <span className="text-[9px] uppercase font-mono text-crimson font-bold">
                              ★ Featured
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-eerie/70 font-medium">{project.title}</p>
                        <p className="text-[11px] text-eerie/50 line-clamp-1 mt-0.5">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => cms.toggleFeatured(project.id)}
                        className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border transition-colors cursor-pointer ${
                          project.isFeatured !== false
                            ? 'bg-amber-500/10 border-amber-500 text-amber-800'
                            : 'border-eerie/20 text-eerie/50 hover:text-eerie'
                        }`}
                      >
                        {project.isFeatured !== false ? 'Featured' : 'Make Featured'}
                      </button>

                      <button
                        onClick={() => setEditingProject(project)}
                        className="px-4 py-1.5 border border-eerie/20 hover:border-eerie text-xs font-semibold uppercase tracking-wider text-eerie transition-colors cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${project.client} — ${project.title}"?`)) {
                            cms.deleteProject(project.id);
                          }
                        }}
                        className="px-3 py-1.5 border border-red-200 hover:bg-red-50 text-xs font-semibold uppercase tracking-wider text-crimson transition-colors cursor-pointer"
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
          <div className="space-y-8">
            <div className="bg-white border border-eerie/15 p-6">
              <h3 className="font-display font-bold text-xl text-eerie mb-2">
                Parallax Gallery & Carousel Artwork
              </h3>
              <p className="text-xs text-eerie/60 mb-6 leading-relaxed max-w-2xl">
                These images rotate smoothly inside the 3 hero parallax columns and the mobile
                carousel. Upload new artwork from your computer, choose from preloaded artboards, or
                paste an image link.
              </p>

              {/* Add image controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-eerie/15">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-eerie/70 mb-2">
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
                    className="w-full py-3 border-2 border-dashed border-eerie/20 hover:border-crimson text-xs font-semibold text-eerie transition-colors bg-cloud-dancer/40 cursor-pointer"
                  >
                    + Choose Image File to Add
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-eerie/70 mb-2">
                    Or Paste Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newGalleryUrl}
                      onChange={(e) => setNewGalleryUrl(e.target.value)}
                      className="flex-1 px-3 py-2 bg-cloud-dancer border border-eerie/20 text-xs outline-none"
                    />
                    <button
                      onClick={() => {
                        if (newGalleryUrl) {
                          cms.addGalleryImage(newGalleryUrl);
                          setNewGalleryUrl('');
                        }
                      }}
                      className="px-4 py-2 bg-eerie text-white text-xs uppercase font-semibold hover:bg-crimson transition-colors cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Speed slider */}
              <div className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-eerie/70">
                    Parallax Drift Velocity
                  </span>
                  <span className="text-xs font-mono font-bold text-crimson">
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
                  className="w-full accent-crimson cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-eerie/40 font-mono mt-1">
                  <span>Slow & Subtle (0.01)</span>
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
                  className="group relative bg-white border border-eerie/15 p-2 shadow-sm"
                >
                  <div className="aspect-[4/5] bg-eerie overflow-hidden mb-2">
                    <img
                      src={imgUrl}
                      alt={`Gallery artboard ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-eerie/60">
                    <span>#{index + 1}</span>
                    <div className="flex gap-1">
                      <button
                        disabled={index === 0}
                        onClick={() => cms.moveGalleryImage(index, -1)}
                        className="p-1 border border-eerie/10 hover:border-eerie disabled:opacity-20 cursor-pointer"
                        title="Move left"
                      >
                        ◀
                      </button>
                      <button
                        disabled={index === cms.galleryImages.length - 1}
                        onClick={() => cms.moveGalleryImage(index, 1)}
                        className="p-1 border border-eerie/10 hover:border-eerie disabled:opacity-20 cursor-pointer"
                        title="Move right"
                      >
                        ▶
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove image #${index + 1}?`)) {
                            cms.removeGalleryImage(index);
                          }
                        }}
                        className="p-1 border border-red-200 text-crimson hover:bg-red-50 cursor-pointer"
                        title="Delete"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: CLIENT BRANDS MARQUEE */}
        {/* ========================================================= */}
        {activeTab === 'brands' && (
          <div className="space-y-8">
            <div className="bg-white border border-eerie/15 p-6">
              <h3 className="font-display font-bold text-xl text-eerie mb-2">
                Client Brand Logos
              </h3>
              <p className="text-xs text-eerie/60 mb-6 leading-relaxed max-w-2xl">
                These logos stream in the infinite ticker marquee in the Selected Clients section.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <input
                  type="text"
                  placeholder="Client / Brand Name"
                  value={newBrandName}
                  onChange={(e) => setNewBrandName(e.target.value)}
                  className="px-3.5 py-2.5 bg-cloud-dancer border border-eerie/20 text-xs outline-none flex-1"
                />
                <input
                  type="text"
                  placeholder="Logo URL or /image/Logos/..."
                  value={newBrandLogo}
                  onChange={(e) => setNewBrandLogo(e.target.value)}
                  className="px-3.5 py-2.5 bg-cloud-dancer border border-eerie/20 text-xs outline-none flex-1"
                />
                <button
                  onClick={() => {
                    if (newBrandName && newBrandLogo) {
                      cms.addBrand(newBrandName, newBrandLogo);
                      setNewBrandName('');
                      setNewBrandLogo('');
                    } else {
                      alert('Please enter both Brand Name and Logo URL');
                    }
                  }}
                  className="px-6 py-2.5 bg-crimson text-white text-xs font-semibold uppercase tracking-wider hover:bg-crimson-dark transition-colors cursor-pointer"
                >
                  Add Brand
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {cms.brands.map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="bg-white border border-eerie/15 p-4 flex flex-col items-center justify-between gap-3 text-center"
                >
                  <div className="h-16 w-full flex items-center justify-center p-2 bg-cloud-dancer">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-12 max-w-full object-contain filter grayscale"
                    />
                  </div>
                  <span className="text-xs font-semibold text-eerie truncate w-full">
                    {brand.name}
                  </span>
                  <button
                    onClick={() => {
                      if (confirm(`Remove brand "${brand.name}"?`)) {
                        cms.removeBrand(index);
                      }
                    }}
                    className="text-[10px] text-crimson uppercase font-mono tracking-wider hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: EXPORT & CODE SYNC */}
        {/* ========================================================= */}
        {activeTab === 'sync' && (
          <div className="space-y-8">
            <div className="bg-white border border-eerie/15 p-6 md:p-8">
              <span className="text-[10px] font-mono uppercase tracking-widest text-crimson font-bold">
                Persistence & Git Sync
              </span>
              <h3 className="font-display font-bold text-2xl text-eerie mt-1 mb-3">
                Export Changes to Codebase
              </h3>
              <p className="text-sm text-eerie/70 leading-relaxed max-w-3xl mb-6">
                All changes you make in this CMS are saved immediately to your browser and reflect
                live across the entire site right now. To synchronize your updates into Git and
                production deployments, copy the generated code below or download a JSON backup.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-eerie/15">
                <button
                  onClick={() => handleCopyCode('portfolio')}
                  className="px-6 py-3 bg-eerie hover:bg-crimson text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  {copiedSection === 'portfolio'
                    ? '✓ Copied portfolioData.js!'
                    : 'Copy portfolioData.js Code'}
                </button>

                <button
                  onClick={() => handleCopyCode('gallery')}
                  className="px-6 py-3 bg-eerie hover:bg-crimson text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  {copiedSection === 'gallery'
                    ? '✓ Copied galleryImages.js!'
                    : 'Copy galleryImages.js Code'}
                </button>

                <button
                  onClick={handleDownloadBackup}
                  className="px-6 py-3 border border-eerie/30 hover:border-eerie bg-white text-eerie text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
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
                  className="px-6 py-3 border border-eerie/30 hover:border-eerie bg-white text-eerie text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
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
                  className="ml-auto px-4 py-3 text-crimson text-xs font-mono uppercase tracking-wider hover:underline cursor-pointer"
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
