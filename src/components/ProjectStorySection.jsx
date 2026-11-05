import { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/audio';

// Default project theme color mapping
const PROJECT_THEMES = {
  1: { accent: '#f59e0b', pillBg: '#f5a623', pillText: '#1e1e20', highlight: '#fef08a' }, // Gokul Oils
  2: { accent: '#d4af37', pillBg: '#eab308', pillText: '#1e1e20', highlight: '#fef08a' }, // Sendra Gold
  3: { accent: '#a855f7', pillBg: '#c084fc', pillText: '#1e1e20', highlight: '#f3e8ff' }, // Diyaa Pure
  4: { accent: '#2563eb', pillBg: '#3b82f6', pillText: '#ffffff', highlight: '#dbeafe' }, // CSIR India
  5: { accent: '#ea580c', pillBg: '#f97316', pillText: '#ffffff', highlight: '#ffedd5' }, // Thomas Bakers
  6: { accent: '#059669', pillBg: '#10b981', pillText: '#1e1e20', highlight: '#d1fae5' }, // Mo Elixir
  7: { accent: '#dc2626', pillBg: '#ef4444', pillText: '#ffffff', highlight: '#fee2e2' }, // Anjarai Petti
  8: { accent: '#16a34a', pillBg: '#22c55e', pillText: '#1e1e20', highlight: '#dcfce7' }, // Miniacres
  9: { accent: '#f43f5e', pillBg: '#fb7185', pillText: '#ffffff', highlight: '#ffe4e6' }, // Do Well Living
  10: { accent: '#0d9488', pillBg: '#14b8a6', pillText: '#ffffff', highlight: '#ccfbf1' }, // CSIR - NEERI
  11: { accent: '#4f46e5', pillBg: '#6366f1', pillText: '#ffffff', highlight: '#e0e7ff' }, // Quill Studio
  12: { accent: '#0891b2', pillBg: '#06b6d4', pillText: '#1e1e20', highlight: '#cffafe' }, // Edwin BS
};

const DEFAULT_THEME = {
  accent: '#f5a623',
  pillBg: '#f5a623',
  pillText: '#1e1e20',
  highlight: '#fef08a',
};

/**
 * Parses and highlights text marked with <mark>, ==highlight==, or [highlight]
 */
export const HighlightedText = ({ text = '', highlightBg = '#fef08a' }) => {
  if (!text || typeof text !== 'string') return text || null;

  // Normalize delimiters to standard token: <mark>content</mark>
  let normalized = text
    .replace(/==([^=]+)==/g, '<mark>$1</mark>')
    .replace(/\[([^\]]+)\]/g, '<mark>$1</mark>');

  const parts = normalized.split(/(<mark>.*?<\/mark>)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('<mark>') && part.endsWith('</mark>')) {
          const content = part.slice(6, -7);
          return (
            <mark
              key={index}
              className="px-1.5 py-0.5 rounded-sm font-semibold text-neutral-900 transition-colors inline decoration-clone"
              style={{
                backgroundColor: highlightBg,
              }}
            >
              {content}
            </mark>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

const ProjectStorySection = ({ project, story: storyProp }) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  // Derive theme colors (custom project story accent, or mapped preset, or golden amber fallback)
  const theme = useMemo(() => {
    const customAccent = storyProp?.accentColor || project?.story?.accentColor;
    if (customAccent) {
      return {
        accent: customAccent,
        pillBg: customAccent,
        pillText: '#1e1e20',
        highlight: storyProp?.highlightColor || project?.story?.highlightColor || '#fef08a',
      };
    }
    return PROJECT_THEMES[project?.id] || DEFAULT_THEME;
  }, [project, storyProp]);

  // Derive chapters: from storyProp, project.story, or structured fallback
  const chapters = useMemo(() => {
    if (storyProp?.chapters && storyProp.chapters.length > 0) {
      return storyProp.chapters;
    }
    if (project?.story?.chapters && project.story.chapters.length > 0) {
      return project.story.chapters;
    }

    // Default 3-chapter narrative derived from project fields
    const client = project?.client || 'The Brand';
    const brief = project?.brief || project?.description || '';
    const approach = project?.approach || '';
    const metric = project?.metric || '+40% Measurable Lift';

    return [
      {
        id: 'problem',
        step: '01',
        phase: 'Problem',
        headline: `Legacy visual fatigue. Not enough category clarity.`,
        narrative: [
          brief ||
            `The existing packaging and visual presence suffered from cluttered brand hierarchy, dated typography, and low distance standout on retail shelves.`,
          `My scope was the architectural brand layer: visual hierarchy, bespoke dieline geometry, and pre-press micro-registration, not generic marketing decoration.`,
        ],
        quotes: [
          {
            text: `“There are <mark>too many competing elements</mark> on competitor shelves, which makes finding authentic quality <mark>overwhelming and difficult</mark>.”`,
            author: 'Category Consumer Audit',
          },
          {
            text: `“Our legacy packaging blended into the shelf background. Shoppers <mark>passed by without pausing</mark> to read our formulation.”`,
            author: `${client} Retail Director`,
          },
        ],
      },
      {
        id: 'insight',
        step: '02',
        phase: 'Insight',
        headline: `Whitespace commands respect. Craft creates trust.`,
        narrative: [
          approach ||
            `Modern shoppers make shelf decisions in under 3 seconds. When every competitor screams with aggressive claim badges, deliberate restraint becomes the loudest signal of purity.`,
          `We structured a golden-ratio dieline isolating mandatory legal compliance into an intuitive micro-grid, leaving the front canvas clear for bespoke vector craft.`,
        ],
        quotes: [
          {
            text: `“When everything on the shelf is loud, <mark>deliberate architectural restraint</mark> becomes the strongest indicator of premium purity.”`,
            author: 'Design Strategy Synthesis',
          },
          {
            text: `“Consumers picked up bottles with <mark>clean single-glance ingredient hierarchies</mark> 3x faster than cluttered alternatives.”`,
            author: 'Eye-Tracking Shelf Benchmark',
          },
        ],
      },
      {
        id: 'solution',
        step: '03',
        phase: 'Solution',
        headline: `Precision dielines. Measurable commercial velocity.`,
        narrative: [
          `Engineered production-grade masters calibrated to ISO 12647-2 standards, with selective tactile finishes, custom Pantone ink drawdowns, and supervised high-speed press runs.`,
          `The redesigned system unified retail distribution and delivered an immediate ${metric} across retail storefronts.`,
        ],
        quotes: [
          {
            text: `“The new identity <mark>commands the aisle from 10 feet away</mark>. Store managers moved it to eye-level endcaps within two weeks.”`,
            author: 'Modern Trade Distribution Lead',
          },
          {
            text: `“The tactile contrast between <mark>matte substrate and selective gloss linework</mark> redefined our brand equity without increasing unit production cost.”`,
            author: `${client} Executive Leadership`,
          },
        ],
      },
    ];
  }, [project, storyProp]);

  // Ensure activeChapterIndex is safe
  const currentChapter = chapters[activeChapterIndex] || chapters[0];

  const handleTabChange = (index) => {
    sound.playClick();
    setActiveChapterIndex(index);
  };

  if (!currentChapter) return null;

  return (
    <div className="w-full text-[#1e1e20]">
      {/* 2-Column Responsive Layout matching shriyap.com / attached reference */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        
        {/* ==================== LEFT COLUMN: THE STORY KICKER & CHAPTER TABS ==================== */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          {/* Eyebrow Header: • THE STORY */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1e1e20]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] font-medium text-[#1e1e20]">
              THE STORY
            </span>
          </div>

          {/* Vertical Capsule Pill Buttons (Horizontal scroll on mobile) */}
          <nav
            aria-label="Story Chapters"
            className="flex flex-row overflow-x-auto lg:flex-col gap-2 pb-2 lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
          >
            {chapters.map((chapter, index) => {
              const isActive = activeChapterIndex === index;
              return (
                <button
                  key={chapter.id || chapter.step || index}
                  type="button"
                  onClick={() => handleTabChange(index)}
                  className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl sm:rounded-2xl transition-all duration-200 cursor-pointer text-left whitespace-nowrap ${
                    isActive
                      ? 'shadow-[0_2px_8px_-2px_rgba(0,0,0,0.12)] font-semibold'
                      : 'hover:bg-black/[0.04] text-[#1e1e20]/60 hover:text-[#1e1e20]'
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: theme.pillBg,
                          color: theme.pillText,
                        }
                      : {}
                  }
                >
                  <span
                    className={`font-mono text-xs transition-opacity ${
                      isActive ? 'opacity-80 font-bold' : 'opacity-60'
                    }`}
                  >
                    {chapter.step}
                  </span>
                  <span className="text-sm tracking-tight">{chapter.phase}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ==================== RIGHT COLUMN: CHAPTER CONTENT ==================== */}
        <div className="lg:col-span-8 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentChapter.id || currentChapter.step || activeChapterIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              {/* Eyebrow: 01 / PROBLEM */}
              <div className="font-mono text-xs uppercase tracking-widest text-[#1e1e20]/50">
                {currentChapter.step} / {currentChapter.phase?.toUpperCase()}
              </div>

              {/* Editorial Headline */}
              <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#18181b] leading-[1.18]">
                {currentChapter.headline}
              </h2>

              {/* Narrative Paragraphs */}
              <div className="space-y-4 font-sans text-base sm:text-lg text-[#1e1e20]/80 leading-relaxed">
                {Array.isArray(currentChapter.narrative) ? (
                  currentChapter.narrative.map((para, pIdx) => (
                    <p key={pIdx}>
                      <HighlightedText text={para} highlightBg={theme.highlight} />
                    </p>
                  ))
                ) : (
                  <p>
                    <HighlightedText
                      text={currentChapter.narrative}
                      highlightBg={theme.highlight}
                    />
                  </p>
                )}
                {currentChapter.scope && (
                  <p className="text-sm sm:text-base text-[#1e1e20]/70 italic pt-1">
                    <HighlightedText
                      text={currentChapter.scope}
                      highlightBg={theme.highlight}
                    />
                  </p>
                )}
              </div>

              {/* Quotes & Evidence Cards */}
              {currentChapter.quotes && currentChapter.quotes.length > 0 && (
                <div className="space-y-4 pt-2">
                  {currentChapter.quotes.map((quoteItem, qIdx) => {
                    const quoteText =
                      typeof quoteItem === 'string' ? quoteItem : quoteItem.text;
                    const author =
                      typeof quoteItem === 'object' ? quoteItem.author : null;

                    return (
                      <div
                        key={qIdx}
                        className="bg-white rounded-2xl p-5 sm:p-7 border border-black/[0.08] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all hover:border-black/[0.12] hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.08)]"
                      >
                        <blockquote className="font-sans text-sm sm:text-base leading-relaxed text-[#1e1e20]">
                          <HighlightedText
                            text={quoteText}
                            highlightBg={theme.highlight}
                          />
                        </blockquote>
                        {author && (
                          <div className="mt-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#1e1e20]/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
                            <span>{author}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default memo(ProjectStorySection);
