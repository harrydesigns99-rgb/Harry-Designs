import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ProjectDetailModal = ({ item, onClose }) => {
  useEffect(() => {
    if (!item) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end md:items-center justify-center p-0 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-cloud-dancer text-eerie shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center border border-eerie/20 text-xl hover:bg-eerie hover:text-white transition-colors"
            >
              &times;
            </button>

            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="min-h-80 lg:min-h-[34rem] bg-eerie overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={`${item.client} project`} className="w-full h-full object-cover" />
                ) : (
                  <div className={`h-full min-h-80 bg-gradient-to-br ${item.color}`} />
                )}
              </div>

              <div className="p-7 md:p-12 lg:p-16">
                <span className="section-kicker !text-eerie/60">Case study / 2024</span>
                <h2 id="project-title" className="font-display text-4xl md:text-6xl font-medium tracking-[-0.06em] leading-none mt-6">
                  {item.client}
                </h2>
                <p className="mt-5 text-lg text-eerie/65 leading-relaxed">{item.description}</p>

                <dl className="grid grid-cols-2 gap-6 mt-10 pt-6 border-t border-eerie/15">
                  <div><dt className="text-xs uppercase tracking-[0.14em] text-eerie/45">Role</dt><dd className="mt-2 font-medium">Creative direction</dd></div>
                  <div><dt className="text-xs uppercase tracking-[0.14em] text-eerie/45">Deliverables</dt><dd className="mt-2 font-medium">Identity / packaging</dd></div>
                </dl>

                <div className="mt-12">
                  <p className="text-xs uppercase tracking-[0.14em] text-eerie/45 mb-3">The brief</p>
                  <p className="leading-relaxed text-eerie/70">
                    Build a distinct visual language that feels considered at every scale, from the first impression to the details customers keep coming back to.
                  </p>
                </div>

                <a href="#contact" onClick={onClose} data-cursor="Start" className="editorial-link mt-10 font-semibold">
                  Start a similar project <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;