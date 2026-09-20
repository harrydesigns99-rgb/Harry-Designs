import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { sound } from '@/utils/audio';

const ProjectDetailModal = ({ item, onClose }) => {
  const [viewModeOverride, setViewModeOverride] = useState(null);
  const [lastItemId, setLastItemId] = useState(item?.id);

  if (item?.id !== lastItemId) {
    setLastItemId(item?.id);
    setViewModeOverride(null);
  }

  const viewMode = viewModeOverride ?? (item?.hasBeforeAfter ? 'compare' : 'artwork');

  useEffect(() => {
    if (!item) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        sound.playClick();
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  const handleClose = () => {
    sound.playClick();
    onClose();
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 lg:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-cloud-dancer text-eerie shadow-2xl border border-eerie/10"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close project details"
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center border border-eerie/20 bg-cloud-dancer/90 text-2xl hover:bg-eerie hover:text-white transition-colors cursor-pointer"
            >
              &times;
            </button>

            <div className="grid lg:grid-cols-[1fr_1.1fr]">
              {/* Left Column: Artwork Image or Before/After Transformation */}
              <div className="min-h-72 sm:min-h-96 lg:min-h-[36rem] bg-neutral-900 overflow-hidden relative flex flex-col justify-center">
                {item.hasBeforeAfter && (
                  <div className="absolute top-4 left-4 z-40 flex items-center bg-black/70 backdrop-blur-md p-1 border border-white/20 shadow-lg">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setViewModeOverride('compare');
                      }}
                      className={`px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase transition-colors ${
                        viewMode === 'compare'
                          ? 'bg-crimson text-white shadow-sm'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      Transformation
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setViewModeOverride('artwork');
                      }}
                      className={`px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase transition-colors ${
                        viewMode === 'artwork'
                          ? 'bg-white text-eerie shadow-sm'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      Single View
                    </button>
                  </div>
                )}

                {item.hasBeforeAfter && viewMode === 'compare' ? (
                  <BeforeAfterSlider
                    beforeImage={item.beforeImage}
                    afterImage={item.afterImage}
                    beforeLabel={item.beforeLabel}
                    afterLabel={item.afterLabel}
                    className="w-full h-full min-h-72 sm:min-h-96 lg:min-h-[36rem]"
                  />
                ) : item.image ? (
                  <div className="relative w-full h-full min-h-72 sm:min-h-96 lg:min-h-[36rem]">
                    <img
                      src={item.image}
                      alt={`${item.client} - ${item.title}`}
                      className="w-full h-full object-cover"
                    />
                    {item.metric && (
                      <div className="absolute bottom-5 left-5 z-10 bg-crimson text-white px-3 py-1.5 text-xs font-semibold tracking-wider uppercase">
                        Impact: {item.metric}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={`h-full min-h-80 bg-gradient-to-br ${item.color}`} />
                )}
              </div>

              {/* Right Column: Case Study Narrative */}
              <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="section-kicker !text-crimson">
                      Case Study / {item.year || '2024'}
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-[0.14em] text-eerie/50 border border-eerie/15 px-2.5 py-0.5">
                      {item.category}
                    </span>
                  </div>

                  <h2
                    id="project-title"
                    className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight text-eerie mt-2"
                  >
                    {item.client}
                  </h2>
                  <p className="text-sm font-semibold tracking-wide text-eerie/60 mt-1 uppercase">
                    {item.title}
                  </p>

                  <p className="mt-5 text-base sm:text-lg text-eerie/80 leading-relaxed font-normal">
                    {item.description}
                  </p>

                  {/* The Brief & Challenge */}
                  <div className="mt-8 pt-6 border-t border-eerie/15">
                    <h4 className="text-xs uppercase tracking-[0.14em] text-eerie/50 font-bold mb-2">
                      The Challenge &amp; Brief
                    </h4>
                    <p className="text-sm text-eerie/75 leading-relaxed">
                      {item.brief || 'Build a distinctive visual identity and packaging system designed for high shelf standout and long-term brand recall.'}
                    </p>
                  </div>

                  {/* Strategic Approach */}
                  <div className="mt-6">
                    <h4 className="text-xs uppercase tracking-[0.14em] text-eerie/50 font-bold mb-2">
                      Strategic Approach
                    </h4>
                    <p className="text-sm text-eerie/75 leading-relaxed">
                      {item.approach || 'Unified typography hierarchy, bespoke iconography, and tactile finish specifications tailored to consumer touchpoints.'}
                    </p>
                  </div>

                  {/* Deliverables Meta */}
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-eerie/15">
                    <div>
                      <dt className="text-xs uppercase tracking-[0.14em] text-eerie/50 font-medium">Role</dt>
                      <dd className="mt-1 text-sm font-semibold text-eerie">Creative Direction &amp; Design</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.14em] text-eerie/50 font-medium">Deliverables</dt>
                      <dd className="mt-1 text-sm font-semibold text-eerie">{item.deliverables || 'Brand Identity & Packaging'}</dd>
                    </div>
                  </dl>
                </div>

                {/* Bottom CTA */}
                <div className="mt-10 pt-6 border-t border-eerie/15 flex flex-wrap items-center justify-between gap-4">
                  <a
                    href="#contact"
                    onClick={() => {
                      onClose();
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    data-cursor="Start"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-crimson text-white font-semibold text-xs tracking-wider uppercase hover:bg-crimson-dark transition-colors"
                  >
                    <span>Inquire About A Similar Project</span>
                    <span aria-hidden="true">↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-xs uppercase tracking-[0.14em] text-eerie/60 hover:text-eerie transition-colors font-medium cursor-pointer"
                  >
                    Close Window &times;
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;