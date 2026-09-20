import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { value: 'packaging', label: 'Packaging' },
  { value: 'branding', label: 'Branding' },
  { value: 'uiux', label: 'UI/UX' },
  { value: 'brochures', label: 'Brochures' },
  { value: 'posters', label: 'Posters' },
];

const PRESET_IMAGES = [
  { label: 'Artboard 1', url: '/image/Image Gallery/Artboard 1.webp' },
  { label: 'Artboard 2', url: '/image/Image Gallery/Artboard 2.webp' },
  { label: 'Artboard 3', url: '/image/Image Gallery/Artboard 3.webp' },
  { label: 'Artboard 4', url: '/image/Image Gallery/Artboard 4.webp' },
  { label: 'Artboard 5', url: '/image/Image Gallery/Artboard 5.webp' },
  { label: 'Artboard 6', url: '/image/Image Gallery/Artboard 6.webp' },
  { label: 'Artboard 7', url: '/image/Image Gallery/Artboard 7.webp' },
  { label: 'Artboard 8', url: '/image/Image Gallery/Artboard 8.webp' },
  { label: 'Artboard 9', url: '/image/Image Gallery/Artboard 9.webp' },
  { label: 'Artboard 10', url: '/image/Image Gallery/Artboard 10.webp' },
  { label: 'Artboard 11', url: '/image/Image Gallery/Artboard 11.webp' },
  { label: 'Artboard 12', url: '/image/Image Gallery/Artboard 12.webp' },
];

const ProjectEditorModal = ({ project, onSave, onClose }) => {
  const isEditing = Boolean(project?.id);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: project?.title || '',
    client: project?.client || '',
    category: project?.category || 'packaging',
    metric: project?.metric || '',
    year: project?.year || new Date().getFullYear().toString(),
    description: project?.description || '',
    brief: project?.brief || '',
    approach: project?.approach || '',
    deliverables: project?.deliverables || '',
    image: project?.image || '/image/Image Gallery/Artboard 1.webp',
    isFeatured: project?.isFeatured !== false,
  });

  const [imageTab, setImageTab] = useState('upload'); // 'upload' | 'preset' | 'url'
  const [compressing, setCompressing] = useState(false);

  // Compress and convert uploaded image file to lightweight WebP data URL
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCompressing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDimension = 1200;
        let { width, height } = img;

        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Export as webp with 0.85 quality
        const webpData = canvas.toDataURL('image/webp', 0.85);
        setFormData((prev) => ({ ...prev, image: webpData }));
        setCompressing(false);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.client) {
      alert('Please enter a Project Title and Client Name.');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-eerie/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-5xl bg-cloud-dancer border border-eerie/20 shadow-2xl p-6 md:p-10 my-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-eerie/15">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-crimson font-mono font-bold">
              {isEditing ? 'Editing Project' : 'New Project'}
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold mt-1 text-eerie">
              {formData.client ? `${formData.client} — ${formData.title || 'Untitled'}` : 'Project Details'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider text-eerie/50 hover:text-eerie transition-colors px-3 py-1.5 border border-eerie/20"
          >
            ✕ Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Form Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-eerie/70 mb-1.5">
                  Client / Brand Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gokul Oils"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-eerie/20 text-sm focus:border-eerie outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-eerie/70 mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Packaging Architecture"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-eerie/20 text-sm focus:border-eerie outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-eerie/70 mb-1.5">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-eerie/20 text-sm focus:border-eerie outline-none cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-eerie/70 mb-1.5">
                  Year
                </label>
                <input
                  type="text"
                  placeholder="2024"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-eerie/20 text-sm focus:border-eerie outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-eerie/70 mb-1.5">
                  Impact Pill / Metric
                </label>
                <input
                  type="text"
                  placeholder="+40% Sales Increase"
                  value={formData.metric}
                  onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-eerie/20 text-sm focus:border-eerie outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-eerie/70 mb-1.5">
                Summary / Card Description
              </label>
              <textarea
                rows={2}
                placeholder="A concise 1-2 sentence description shown on the portfolio card..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-eerie/20 text-sm focus:border-eerie outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-eerie/70 mb-1.5">
                  The Brief / Challenge
                </label>
                <textarea
                  rows={3}
                  placeholder="What was the problem the client needed solved?"
                  value={formData.brief}
                  onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-eerie/20 text-sm focus:border-eerie outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-eerie/70 mb-1.5">
                  Strategy & Approach
                </label>
                <textarea
                  rows={3}
                  placeholder="How did you solve it through design?"
                  value={formData.approach}
                  onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-eerie/20 text-sm focus:border-eerie outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-eerie/70 mb-1.5">
                Deliverables
              </label>
              <input
                type="text"
                placeholder="Brand Identity • Packaging Architecture • 3D Renders"
                value={formData.deliverables}
                onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-eerie/20 text-sm focus:border-eerie outline-none"
              />
            </div>

            {/* Featured toggle */}
            <div className="flex items-center gap-3 p-3 bg-white/70 border border-eerie/10">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="h-4 w-4 accent-crimson cursor-pointer"
              />
              <label htmlFor="isFeatured" className="text-xs font-medium text-eerie cursor-pointer select-none">
                Feature on Homepage (displays prominently in the Selected Work top section)
              </label>
            </div>
          </div>

          {/* RIGHT: Image Selector & Live Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-4 bg-white border border-eerie/15">
              <label className="block text-xs font-mono uppercase tracking-wider text-eerie/70 mb-3">
                Artwork / Cover Image
              </label>

              {/* Image Tabs */}
              <div className="flex border-b border-eerie/15 mb-4 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setImageTab('upload')}
                  className={`pb-2 px-3 transition-colors ${
                    imageTab === 'upload'
                      ? 'border-b-2 border-crimson text-crimson font-bold'
                      : 'text-eerie/50 hover:text-eerie'
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('preset')}
                  className={`pb-2 px-3 transition-colors ${
                    imageTab === 'preset'
                      ? 'border-b-2 border-crimson text-crimson font-bold'
                      : 'text-eerie/50 hover:text-eerie'
                  }`}
                >
                  Preset Gallery
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('url')}
                  className={`pb-2 px-3 transition-colors ${
                    imageTab === 'url'
                      ? 'border-b-2 border-crimson text-crimson font-bold'
                      : 'text-eerie/50 hover:text-eerie'
                  }`}
                >
                  Paste URL
                </button>
              </div>

              {/* Upload Tab */}
              {imageTab === 'upload' && (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-eerie/20 hover:border-crimson/60 p-6 text-center cursor-pointer transition-colors bg-cloud-dancer/50"
                  >
                    <span className="text-2xl block mb-2">📷</span>
                    <p className="text-xs font-semibold text-eerie">Click to upload an image from your computer</p>
                    <p className="text-[11px] text-eerie/50 mt-1">PNG, JPG, or WebP. Auto-optimized for web.</p>
                  </div>
                  {compressing && (
                    <p className="text-xs text-crimson font-mono mt-2 animate-pulse">
                      Optimizing and preparing image...
                    </p>
                  )}
                </div>
              )}

              {/* Preset Gallery Tab */}
              {imageTab === 'preset' && (
                <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1">
                  {PRESET_IMAGES.map((preset) => (
                    <div
                      key={preset.url}
                      onClick={() => setFormData({ ...formData, image: preset.url })}
                      className={`cursor-pointer border-2 transition-all aspect-square overflow-hidden ${
                        formData.image === preset.url
                          ? 'border-crimson ring-2 ring-crimson/20'
                          : 'border-transparent hover:border-eerie/30'
                      }`}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* URL Tab */}
              {imageTab === 'url' && (
                <div>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 bg-cloud-dancer border border-eerie/20 text-xs focus:border-eerie outline-none"
                  />
                </div>
              )}
            </div>

            {/* Live Card Preview */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-eerie/50">
                  Live Portfolio Card Preview
                </span>
                <span className="text-[10px] font-mono text-crimson font-semibold">Real-time</span>
              </div>

              <div className="relative aspect-[4/5] w-full max-w-[280px] mx-auto overflow-hidden bg-eerie shadow-lg border border-eerie/20">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.client}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-white/30 text-xs">
                    No image chosen
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-left pointer-events-none">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-[9px] uppercase tracking-[0.16em] text-white/70 font-mono">
                      {formData.category} / {formData.year || '2024'}
                    </p>
                    {formData.metric && (
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-crimson px-1.5 py-0.5 text-white">
                        {formData.metric}
                      </span>
                    )}
                  </div>
                  <h4 className="font-display text-lg font-medium text-white leading-tight">
                    {formData.client || 'Client Name'}
                  </h4>
                  <p className="text-[11px] uppercase tracking-wide text-white/75 mt-0.5 font-medium">
                    {formData.title || 'Project Title'}
                  </p>
                  {formData.description && (
                    <p className="text-[11px] text-white/70 mt-1 line-clamp-2 leading-relaxed">
                      {formData.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="lg:col-span-12 flex items-center justify-end gap-4 pt-6 border-t border-eerie/15">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-eerie/20 text-xs font-semibold uppercase tracking-wider text-eerie/70 hover:text-eerie hover:bg-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-crimson hover:bg-crimson-dark text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              {isEditing ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProjectEditorModal;
