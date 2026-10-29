import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { getProcessBehindProcess } from '@/features/portfolio/data/portfolioData';

const CATEGORIES = [
  { value: 'packaging', label: 'Packaging' },
  { value: 'branding', label: 'Branding' },
  { value: 'uiux', label: 'UI/UX' },
  { value: 'brochures', label: 'Brochures' },
  { value: 'posters', label: 'Posters' },
];

const PRESET_IMAGES = [
  { label: 'Artboard 1 (Sendra Gold)', url: '/image/Image Gallery/Artboard 1.webp' },
  { label: 'Artboard 2 (Gokul Oils)', url: '/image/Image Gallery/Artboard 2.webp' },
  { label: 'Artboard 3 (CSIR India)', url: '/image/Image Gallery/Artboard 3.webp' },
  { label: 'Artboard 4 (Diyaa Pure)', url: '/image/Image Gallery/Artboard 4.webp' },
  { label: 'Artboard 5 (Mo Elixir)', url: '/image/Image Gallery/Artboard 5.webp' },
  { label: 'Artboard 6 (Thomas Bakers)', url: '/image/Image Gallery/Artboard 6.webp' },
  { label: 'Artboard 7 (Anjarai Petti)', url: '/image/Image Gallery/Artboard 7.webp' },
  { label: 'Artboard 8 (Miniacres)', url: '/image/Image Gallery/Artboard 8.webp' },
  { label: 'Artboard 9 (Do Well Living)', url: '/image/Image Gallery/Artboard 9.webp' },
  { label: 'Artboard 10 (CSIR-NEERI)', url: '/image/Image Gallery/Artboard 10.webp' },
  { label: 'Artboard 11 (Quill Studio)', url: '/image/Image Gallery/Artboard 11.webp' },
  { label: 'Artboard 12 (EBS)', url: '/image/Image Gallery/Artboard 12.webp' },
];

const PRESET_SAMPLES = [
  { label: 'Sample 1 (Sendra Concept)', url: '/image/samples/1.webp' },
  { label: 'Sample 2 (Gokul Legacy)', url: '/image/samples/2.webp' },
  { label: 'Sample 3 (CSIR Proposal)', url: '/image/samples/3.webp' },
  { label: 'Sample 4 (Diyaa Draft)', url: '/image/samples/4.webp' },
  { label: 'Sample 5 (Mo Can Sketch)', url: '/image/samples/5.webp' },
  { label: 'Sample 6 (Thomas Legacy)', url: '/image/samples/6.webp' },
  { label: 'Sample 7 (Anjarai Concept)', url: '/image/samples/7.webp' },
  { label: 'Sample 8 (Miniacres Logo)', url: '/image/samples/8.webp' },
  { label: 'Sample 9 (Do Well Wireframe)', url: '/image/samples/9.webp' },
  { label: 'Sample 10 (NEERI Layout)', url: '/image/samples/10.webp' },
  { label: 'Sample 11 (Quill Woodtype)', url: '/image/samples/11.webp' },
];

const DEFAULT_STAGES = [
  { step: '01', phase: 'Audit & Diagnostic', title: 'Competitive Category & Shelf Analysis', narrative: 'In-depth market research and retail shelf analysis to uncover category fatigue and brand positioning gaps.', decision: 'Eliminate visual clutter in favor of an authoritative hierarchy.', artifact: 'Shelf Audit & Problem Matrix' },
  { step: '02', phase: 'Concept Genesis', title: 'Visual Direction & Typographic Territory', narrative: 'Exploration of aesthetic concepts, custom lettering, and moodboards to anchor brand world.', decision: 'Selected bespoke typographic pairings for high distance standout.', artifact: '3 Aesthetic Directions' },
  { step: '03', phase: 'Form & Dieline Engineering', title: 'Structural Dielines & Prototyping', narrative: 'CAD dieline drafting, carton folding tests, and digital layout prototypes.', decision: 'Engineered ergonomic folds and micro-perforations.', artifact: 'CAD Vector Dielines' },
  { step: '04', phase: 'Materiality & Color System', title: 'Substrate & Pantone Spot Formulations', narrative: 'Testing paperboard stocks, cold foils, debossing, and Pantone spot ink drawdowns.', decision: 'Specified tactile uncoated cotton stock with blind debossing.', artifact: 'Pantone Drawdown Proofs' },
  { step: '05', phase: 'Production & Market Impact', title: 'Pre-Press Micro-Registration & Retail Launch', narrative: 'Supervising high-speed press runs, color density calibration, and commercial deployment.', decision: 'Live press tuning of ink densities under grocery lighting.', artifact: '100% Press-Ready Masters' },
];

const ProjectEditorModal = ({ project, onSave, onClose }) => {
  const isEditing = Boolean(project?.id);
  const fileInputRef = useRef(null);
  const conceptFileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'making-process' | 'studio-process' | 'specs'
  const [activeStageEditIndex, setActiveStageEditIndex] = useState(0);

  // Initialize form state
  const initialStages =
    project?.process?.stages && project.process.stages.length > 0
      ? project.process.stages
      : DEFAULT_STAGES;

  const initialProcessBehindProcess =
    project?.processBehindProcess || getProcessBehindProcess(project);

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
    hasBeforeAfter: project?.hasBeforeAfter || false,
    process: {
      summary: project?.process?.summary || '',
      conceptImage: project?.process?.conceptImage || project?.beforeImage || '',
      conceptLabel: project?.process?.conceptLabel || project?.beforeLabel || 'Initial Concept Exploration',
      finalLabel: project?.process?.finalLabel || project?.afterLabel || 'Final Production System',
      stages: initialStages,
    },
    processBehindProcess: initialProcessBehindProcess,
    anatomy: project?.anatomy || {
      substrate: '350 GSM Arctic Silk Pure Board',
      finish: 'Soft-Touch Matte Lamination + Spot Gloss UV (70µ)',
      printProcess: '6-Color Offset UV Lithography + Spot Pantone',
      dielineType: 'Reverse Tuck End (RTE) with Dust Flaps',
      dimensions: '185 × 92 × 54 mm (+3mm Bleed)',
      pantones: [
        { code: 'PANTONE 186 C', name: 'Atelier Crimson', hex: '#ba2026', cmyk: '0 / 100 / 81 / 4' },
        { code: 'PANTONE Black 6 C', name: 'Deep Onyx Ink', hex: '#121212', cmyk: '82 / 71 / 59 / 75' },
        { code: 'PANTONE 7527 C', name: 'Cloud Alabaster', hex: '#d6d2c4', cmyk: '3 / 4 / 14 / 8' },
        { code: 'PANTONE 871 C', name: 'Metallic Antique Gold', hex: '#84754e', cmyk: '20 / 25 / 60 / 25' },
      ],
    },
    systemSpecs: project?.systemSpecs || {
      palette: [
        { code: 'Brand Primary', name: 'Atelier Crimson', hex: '#ba2026', cmyk: '0 / 100 / 81 / 4' },
        { code: 'Deep Surface', name: 'Deep Onyx Noir', hex: '#121212', cmyk: '82 / 71 / 59 / 75' },
        { code: 'Base Tone', name: 'Cloud Alabaster', hex: '#f7f5f0', cmyk: '3 / 4 / 14 / 8' },
        { code: 'Accent Ink', name: 'Warm Ochre Gold', hex: '#84754e', cmyk: '20 / 25 / 60 / 25' },
      ],
      typography: 'Bespoke Display Serif paired with Neue Haas Grotesk',
      grid: '12-Column Baseline Modular Grid (4pt / 8pt Vertical Rhythm)',
      standard: 'Design System & Master Brand Architecture Standard',
    },
  });

  const [imageTab, setImageTab] = useState('upload');
  const [compressing, setCompressing] = useState(false);

  // Compress and handle image uploads
  const handleImageFile = (e, targetField) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCompressing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDimension = 1400;
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

        const webpData = canvas.toDataURL('image/webp', 0.85);
        if (targetField === 'conceptImage') {
          setFormData((prev) => ({
            ...prev,
            process: { ...prev.process, conceptImage: webpData },
          }));
        } else {
          setFormData((prev) => ({ ...prev, image: webpData }));
        }
        setCompressing(false);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Helper to update a stage in making-process
  const updateStageField = (index, field, value) => {
    setFormData((prev) => {
      const newStages = [...prev.process.stages];
      newStages[index] = { ...newStages[index], [field]: value };
      return {
        ...prev,
        process: { ...prev.process, stages: newStages },
      };
    });
  };

  // Helper to update pillar in process-behind-process
  const updatePillar = (index, field, value) => {
    setFormData((prev) => {
      const newPillars = [...(prev.processBehindProcess.pillars || [])];
      newPillars[index] = { ...newPillars[index], [field]: value };
      return {
        ...prev,
        processBehindProcess: { ...prev.processBehindProcess, pillars: newPillars },
      };
    });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#1e1e20]/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl bg-[#f5f4f0] rounded-3xl border border-black/10 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.35)] p-5 sm:p-8 md:p-10 my-6 max-h-[92vh] overflow-y-auto bg-dot-grid text-[#1e1e20]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-black/[0.08]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8b151b] animate-pulse" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#8b151b] font-mono font-bold">
                {isEditing ? 'Editing Project Case Study' : 'New Project Case Study'}
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mt-1 text-[#1e1e20] tracking-tight">
              {formData.client ? `${formData.client} — ${formData.title || 'Untitled'}` : 'Case Study Details'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-black/15 bg-white/70 hover:bg-white text-xs font-sans font-medium text-[#1e1e20] transition-all cursor-pointer shadow-2xs hover:scale-105"
          >
            ✕ Close
          </button>
        </div>

        {/* Section Tabs inside Editor */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-5 pb-3 border-b border-black/[0.08] text-xs font-sans">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 sm:px-5 py-2 rounded-full uppercase tracking-wider transition-all cursor-pointer font-medium ${
              activeTab === 'overview'
                ? 'bg-[#1e1e20] text-[#f5f4f0] shadow-md scale-102 font-semibold'
                : 'bg-white/80 hover:bg-white border border-black/[0.08] text-[#1e1e20]/75 shadow-2xs'
            }`}
          >
            ✦ Overview &amp; Artwork
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('making-process')}
            className={`px-4 sm:px-5 py-2 rounded-full uppercase tracking-wider transition-all cursor-pointer font-medium flex items-center gap-1.5 ${
              activeTab === 'making-process'
                ? 'bg-[#1e1e20] text-[#f5f4f0] shadow-md scale-102 font-semibold'
                : 'bg-white/80 hover:bg-white border border-black/[0.08] text-[#1e1e20]/75 shadow-2xs'
            }`}
          >
            <span>✎ 5-Stage Making Process</span>
            <span className="text-[9px] px-1.5 py-0.5 bg-[#8b151b] text-white rounded-full">5 STAGES</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('studio-process')}
            className={`px-4 sm:px-5 py-2 rounded-full uppercase tracking-wider transition-all cursor-pointer font-medium ${
              activeTab === 'studio-process'
                ? 'bg-[#1e1e20] text-[#f5f4f0] shadow-md scale-102 font-semibold'
                : 'bg-white/80 hover:bg-white border border-black/[0.08] text-[#1e1e20]/75 shadow-2xs'
            }`}
          >
            ⚙ Process Behind The Process
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`px-4 sm:px-5 py-2 rounded-full uppercase tracking-wider transition-all cursor-pointer font-medium ${
              activeTab === 'specs'
                ? 'bg-[#1e1e20] text-[#f5f4f0] shadow-md scale-102 font-semibold'
                : 'bg-white/80 hover:bg-white border border-black/[0.08] text-[#1e1e20]/75 shadow-2xs'
            }`}
          >
            ◫ Specs &amp; Pantones
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* ========================================================= */}
          {/* TAB 1: OVERVIEW & ARTWORK */}
          {/* ========================================================= */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Form Fields */}
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1.5 font-medium">
                      Client / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gokul Oils"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white rounded-2xl border border-black/15 text-xs focus:border-[#8b151b] focus:ring-1 focus:ring-[#8b151b] outline-none transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1.5 font-medium">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Packaging Architecture"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white rounded-2xl border border-black/15 text-xs focus:border-[#8b151b] focus:ring-1 focus:ring-[#8b151b] outline-none transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1.5 font-medium">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white rounded-2xl border border-black/15 text-xs focus:border-[#8b151b] outline-none cursor-pointer transition-all font-sans"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1.5 font-medium">
                      Year
                    </label>
                    <input
                      type="text"
                      placeholder="2024"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white rounded-2xl border border-black/15 text-xs focus:border-[#8b151b] outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1.5 font-medium">
                      Impact Pill / Metric
                    </label>
                    <input
                      type="text"
                      placeholder="+40% Sales Increase"
                      value={formData.metric}
                      onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white rounded-2xl border border-black/15 text-xs focus:border-[#8b151b] outline-none font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1.5 font-medium">
                    Summary / Card Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="A concise 1-2 sentence description shown on the portfolio card..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white rounded-2xl border border-black/15 text-xs focus:border-[#8b151b] outline-none resize-none font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1.5 font-medium">
                      The Brief / Challenge
                    </label>
                    <textarea
                      rows={3}
                      placeholder="What was the problem the client needed solved?"
                      value={formData.brief}
                      onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white rounded-2xl border border-black/15 text-xs focus:border-[#8b151b] outline-none resize-none font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1.5 font-medium">
                      Strategy &amp; Approach
                    </label>
                    <textarea
                      rows={3}
                      placeholder="How did you solve it through design?"
                      value={formData.approach}
                      onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white rounded-2xl border border-black/15 text-xs focus:border-[#8b151b] outline-none resize-none font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1.5 font-medium">
                    Deliverables List
                  </label>
                  <input
                    type="text"
                    placeholder="Brand Identity • Packaging Architecture • 3D Renders"
                    value={formData.deliverables}
                    onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white rounded-2xl border border-black/15 text-xs focus:border-[#8b151b] outline-none font-sans"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="h-4 w-4 accent-[#8b151b] cursor-pointer"
                  />
                  <label htmlFor="isFeatured" className="text-xs font-sans text-[#1e1e20]/80 cursor-pointer font-medium">
                    Feature on Home Portfolio Grid
                  </label>
                </div>
              </div>

              {/* Right Column: Main Artwork Media Selector */}
              <div className="lg:col-span-5 space-y-4">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 font-medium">
                  Primary Final Artwork *
                </label>

                {/* Preview Box */}
                <div className="relative aspect-[4/3] bg-neutral-900 rounded-3xl border border-black/10 overflow-hidden flex items-center justify-center shadow-md">
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-white/40 font-mono">No Image Selected</span>
                  )}
                  {compressing && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-xs text-white font-mono">
                      Processing WebP...
                    </div>
                  )}
                </div>

                {/* Image Tabs */}
                <div className="flex items-center gap-1.5 border-b border-black/[0.08] pb-2 text-xs font-sans">
                  <button
                    type="button"
                    onClick={() => setImageTab('upload')}
                    className={`px-4 py-1.5 rounded-full cursor-pointer transition-all ${imageTab === 'upload' ? 'bg-[#1e1e20] text-white font-medium' : 'text-[#1e1e20]/60 hover:text-[#1e1e20]'}`}
                  >
                    Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageTab('preset')}
                    className={`px-4 py-1.5 rounded-full cursor-pointer transition-all ${imageTab === 'preset' ? 'bg-[#1e1e20] text-white font-medium' : 'text-[#1e1e20]/60 hover:text-[#1e1e20]'}`}
                  >
                    Presets
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageTab('url')}
                    className={`px-4 py-1.5 rounded-full cursor-pointer transition-all ${imageTab === 'url' ? 'bg-[#1e1e20] text-white font-medium' : 'text-[#1e1e20]/60 hover:text-[#1e1e20]'}`}
                  >
                    URL
                  </button>
                </div>

                {imageTab === 'upload' && (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFile(e, 'image')}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-3.5 rounded-2xl border-2 border-dashed border-black/15 hover:border-[#8b151b] text-xs font-sans font-medium text-[#1e1e20]/80 hover:text-[#8b151b] bg-white transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>📁</span>
                      <span>Browse &amp; Upload Local File</span>
                    </button>
                  </div>
                )}

                {imageTab === 'preset' && (
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-white rounded-2xl border border-black/10">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.url}
                        type="button"
                        onClick={() => setFormData({ ...formData, image: preset.url })}
                        className={`text-left p-2.5 rounded-xl border text-[11px] truncate cursor-pointer transition-all ${
                          formData.image === preset.url ? 'border-[#8b151b] bg-[#8b151b]/10 font-bold text-[#8b151b]' : 'border-black/5 hover:border-black/15 text-[#1e1e20]/70'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                )}

                {imageTab === 'url' && (
                  <input
                    type="text"
                    placeholder="https://..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white rounded-2xl border border-black/15 text-xs font-mono outline-none focus:border-[#8b151b]"
                  />
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: DESIGN PROCESS */}
          {/* ========================================================= */}
          {activeTab === 'making-process' && (
            <div className="space-y-6">
              {/* Process Behind Design Summary Paragraph */}
              <div className="p-6 bg-white rounded-3xl border border-black/[0.08] shadow-xs space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8b151b] font-bold">
                  Process Behind the Design (Summary Paragraph)
                </label>
                <textarea
                  rows="3"
                  placeholder="Enter the concise narrative paragraph explaining the strategic process behind this design..."
                  value={formData.process.summary || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      process: { ...formData.process, summary: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-black/15 text-xs outline-none focus:border-[#8b151b] resize-none font-sans"
                />
                <p className="text-[10px] font-mono text-[#1e1e20]/50">
                  This paragraph is displayed prominently in &ldquo;The Process Behind the Design&rdquo; section on the case study screen.
                </p>
              </div>

              {/* Early Concept / Exploration Image for Before-After Comparison */}
              <div className="p-6 bg-white rounded-3xl border border-black/[0.08] shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#8b151b] font-bold">
                      Early Concept / Exploration Asset
                    </h4>
                    <p className="text-xs text-[#1e1e20]/65 font-sans">
                      Showcased in the interactive &ldquo;Concept vs. Final System&rdquo; slider.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      ref={conceptFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFile(e, 'conceptImage')}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => conceptFileInputRef.current?.click()}
                      className="px-4 py-2 rounded-full bg-[#f5f4f0] hover:bg-white border border-black/15 text-xs font-sans font-medium text-[#1e1e20] hover:border-[#8b151b] cursor-pointer shadow-2xs"
                    >
                      Upload Concept Image
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1e1e20]/60 mb-1">
                      Concept Image Path / URL
                    </label>
                    <input
                      type="text"
                      placeholder="/image/samples/1.webp"
                      value={formData.process.conceptImage || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          process: { ...formData.process, conceptImage: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-black/15 text-xs font-mono outline-none focus:border-[#8b151b]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1e1e20]/60 mb-1">
                      Pick From Available Sample Assets
                    </label>
                    <select
                      value={formData.process.conceptImage || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          process: { ...formData.process, conceptImage: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-black/15 text-xs outline-none cursor-pointer focus:border-[#8b151b] font-sans"
                    >
                      <option value="">-- No Concept Comparison --</option>
                      {PRESET_SAMPLES.map((s) => (
                        <option key={s.url} value={s.url}>
                          {s.label} ({s.url})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1e1e20]/60 mb-1">
                      Concept Label
                    </label>
                    <input
                      type="text"
                      placeholder="Initial Concept Exploration"
                      value={formData.process.conceptLabel || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          process: { ...formData.process, conceptLabel: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-black/15 text-xs outline-none focus:border-[#8b151b] font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1e1e20]/60 mb-1">
                      Final Production Label
                    </label>
                    <input
                      type="text"
                      placeholder="Final Production System"
                      value={formData.process.finalLabel || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          process: { ...formData.process, finalLabel: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-black/15 text-xs outline-none focus:border-[#8b151b] font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Stage Navigation Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                {formData.process.stages.map((stage, idx) => (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => setActiveStageEditIndex(idx)}
                    className={`px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                      activeStageEditIndex === idx
                        ? 'bg-[#1e1e20] text-[#f5f4f0] shadow-md font-semibold'
                        : 'bg-white border border-black/[0.08] text-[#1e1e20]/75 hover:text-[#1e1e20]'
                    }`}
                  >
                    <span className="font-mono text-[#8b151b] font-bold">{stage.step}</span>
                    <span className="truncate max-w-[120px]">{stage.phase}</span>
                  </button>
                ))}
              </div>

              {/* Active Stage Form Fields */}
              {formData.process.stages[activeStageEditIndex] && (
                <div className="p-6 bg-white rounded-3xl border border-black/[0.08] shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                    <span className="text-xs font-mono font-bold text-[#8b151b] uppercase tracking-wider">
                      Editing Phase {formData.process.stages[activeStageEditIndex].step}
                    </span>
                    <span className="text-[10px] font-mono text-[#1e1e20]/50">
                      Phase {activeStageEditIndex + 1} of 5
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                        Phase Name
                      </label>
                      <input
                        type="text"
                        value={formData.process.stages[activeStageEditIndex].phase}
                        onChange={(e) =>
                          updateStageField(activeStageEditIndex, 'phase', e.target.value)
                        }
                        className="w-full px-4 py-2.5 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-black/15 text-xs font-semibold outline-none focus:border-[#8b151b] font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                        Stage Title / Headline
                      </label>
                      <input
                        type="text"
                        value={formData.process.stages[activeStageEditIndex].title}
                        onChange={(e) =>
                          updateStageField(activeStageEditIndex, 'title', e.target.value)
                        }
                        className="w-full px-4 py-2.5 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-black/15 text-xs font-semibold outline-none focus:border-[#8b151b] font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                      Narrative Paragraph
                    </label>
                    <textarea
                      rows={3}
                      value={formData.process.stages[activeStageEditIndex].narrative}
                      onChange={(e) =>
                        updateStageField(activeStageEditIndex, 'narrative', e.target.value)
                      }
                      className="w-full px-4 py-2.5 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-black/15 text-xs outline-none focus:border-[#8b151b] leading-relaxed font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#8b151b] font-bold mb-1">
                      Strategic Design Decision Rationale (Callout Quote)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.process.stages[activeStageEditIndex].decision}
                      onChange={(e) =>
                        updateStageField(activeStageEditIndex, 'decision', e.target.value)
                      }
                      className="w-full px-4 py-2.5 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-[#8b151b]/30 text-xs outline-none leading-relaxed font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                      Deliverable / Tangible Artifact Badge
                    </label>
                    <input
                      type="text"
                      value={formData.process.stages[activeStageEditIndex].artifact}
                      onChange={(e) =>
                        updateStageField(activeStageEditIndex, 'artifact', e.target.value)
                      }
                      className="w-full px-4 py-2.5 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-black/15 text-xs outline-none focus:border-[#8b151b] font-sans"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: THE PROCESS BEHIND THE PROCESS */}
          {/* ========================================================= */}
          {activeTab === 'studio-process' && (
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-3xl border border-black/[0.08] shadow-xs space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#8b151b] font-bold">
                  Studio Principle &amp; Guiding Quote
                </h4>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1e1e20]/60 mb-1 font-medium">
                    Studio Truth / Quote
                  </label>
                  <textarea
                    rows={2}
                    value={formData.processBehindProcess.quote || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        processBehindProcess: {
                          ...formData.processBehindProcess,
                          quote: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-black/15 text-xs outline-none focus:border-[#8b151b] font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1e1e20]/60 mb-1 font-medium">
                    Subtitle Description
                  </label>
                  <input
                    type="text"
                    value={formData.processBehindProcess.subtitle || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        processBehindProcess: {
                          ...formData.processBehindProcess,
                          subtitle: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-black/15 text-xs outline-none focus:border-[#8b151b] font-sans"
                  />
                </div>
              </div>

              {/* 4 Protocol Pillars */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 font-bold">
                  The 4 Studio Protocol Pillars
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formData.processBehindProcess.pillars?.map((pillar, idx) => (
                    <div key={idx} className="p-5 bg-white rounded-3xl border border-black/[0.08] shadow-xs space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#1e1e20]/40">
                        <span>PILLAR 0{idx + 1}</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Pillar Label"
                        value={pillar.label}
                        onChange={(e) => updatePillar(idx, 'label', e.target.value)}
                        className="w-full px-3 py-2 bg-[#f5f4f0] focus:bg-white rounded-xl border border-black/15 text-xs font-bold outline-none font-sans"
                      />
                      <input
                        type="text"
                        placeholder="Metric / Badge"
                        value={pillar.metric}
                        onChange={(e) => updatePillar(idx, 'metric', e.target.value)}
                        className="w-full px-3 py-2 bg-[#f5f4f0] focus:bg-white rounded-xl border border-[#8b151b]/20 text-xs font-mono text-[#8b151b] outline-none"
                      />
                      <textarea
                        rows={2}
                        placeholder="Detail explanation..."
                        value={pillar.detail}
                        onChange={(e) => updatePillar(idx, 'detail', e.target.value)}
                        className="w-full px-3 py-2 bg-[#f5f4f0] focus:bg-white rounded-xl border border-black/15 text-xs outline-none resize-none font-sans"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Deep-Dive Narrative */}
              <div className="p-6 bg-white rounded-3xl border border-black/[0.08] shadow-xs">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-2 font-medium">
                  The Adversarial Standard: Deep-Dive Philosophy
                </label>
                <textarea
                  rows={3}
                  value={formData.processBehindProcess.deepDive || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      processBehindProcess: {
                        ...formData.processBehindProcess,
                        deepDive: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-3 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-black/15 text-xs outline-none focus:border-[#8b151b] leading-relaxed font-sans"
                />
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: SPECS & PANTONES */}
          {/* ========================================================= */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              {formData.category === 'packaging' ? (
                <div className="p-6 bg-white rounded-3xl border border-black/[0.08] shadow-xs space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#8b151b] font-bold">
                    Packaging Anatomy &amp; Print Specifications
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                        Substrate Material
                      </label>
                      <input
                        type="text"
                        value={formData.anatomy?.substrate || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            anatomy: { ...formData.anatomy, substrate: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-black/15 text-xs outline-none focus:border-[#8b151b] font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                        Finish &amp; Embellishments
                      </label>
                      <input
                        type="text"
                        value={formData.anatomy?.finish || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            anatomy: { ...formData.anatomy, finish: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-black/15 text-xs outline-none focus:border-[#8b151b] font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                        Dieline Geometry Type
                      </label>
                      <input
                        type="text"
                        value={formData.anatomy?.dielineType || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            anatomy: { ...formData.anatomy, dielineType: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-black/15 text-xs outline-none focus:border-[#8b151b] font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                        Dimensions
                      </label>
                      <input
                        type="text"
                        value={formData.anatomy?.dimensions || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            anatomy: { ...formData.anatomy, dimensions: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-black/15 text-xs outline-none focus:border-[#8b151b] font-mono"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-white rounded-3xl border border-black/[0.08] shadow-xs space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#8b151b] font-bold">
                    Design System Architecture &amp; Specifications
                  </h4>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                      Typography Hierarchy &amp; Pairing
                    </label>
                    <input
                      type="text"
                      value={formData.systemSpecs?.typography || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          systemSpecs: { ...formData.systemSpecs, typography: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-black/15 text-xs outline-none focus:border-[#8b151b] font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                      Grid &amp; Spatial Hierarchy
                    </label>
                    <input
                      type="text"
                      value={formData.systemSpecs?.grid || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          systemSpecs: { ...formData.systemSpecs, grid: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-black/15 text-xs outline-none focus:border-[#8b151b] font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#1e1e20]/70 mb-1 font-medium">
                      Compliance Standard
                    </label>
                    <input
                      type="text"
                      value={formData.systemSpecs?.standard || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          systemSpecs: { ...formData.systemSpecs, standard: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-[#f5f4f0] focus:bg-white rounded-2xl border border-black/15 text-xs outline-none focus:border-[#8b151b] font-sans"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-black/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full border border-black/15 bg-white hover:bg-[#f5f4f0] text-xs font-sans font-medium text-[#1e1e20]/70 hover:text-[#1e1e20] cursor-pointer transition-all shadow-2xs"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-[#8b151b] hover:bg-[#7a161c] text-white text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer hover:shadow-lg hover:scale-105"
            >
              Save Project &amp; Publish Case Study ↗
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProjectEditorModal;
