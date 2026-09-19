import { motion } from 'framer-motion';
import { useState } from 'react';
import { useIsMobile } from '@/hooks';
import { fadeInUp, TRANSITIONS } from '@/animations';
import ProjectDetailModal from './ProjectDetailModal';

const FeaturedCard = ({ item, index, isInView, onSelect }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const isMobile = useIsMobile();
  const Icon = item.icon;

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, scale: 0.9, x: index === 0 ? -50 : 50 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, x: 0 }
          : { opacity: 0, scale: 0.9, x: index === 0 ? -50 : 50 }
      }
      transition={{
        delay: 0.6 + index * 0.2,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        !isMobile
          ? {
              scale: 1.05,
              y: -10,
              transition: { duration: 0.3 },
            }
          : {}
      }
      data-cursor="View"
      className="group relative overflow-hidden cursor-pointer"
      onClick={() => onSelect(item)}
      onMouseEnter={() => !isMobile && setHoveredItem(item.id)}
      onMouseLeave={() => !isMobile && setHoveredItem(null)}
    >
      {/* Card container with larger aspect ratio for featured */}
      <div className="relative overflow-hidden aspect-[4/5] w-full shadow-lg">
        
        {/* Full Image Background */}
        <div className="absolute inset-0 z-0">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.client}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
             <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color}`}
                  animate={{
                    scale: !isMobile && hoveredItem === item.id ? 1.15 : 1,
                  }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                <Icon className="relative z-10 text-8xl text-white/50" />
             </div>
          )}
          
          {/* Enhanced Text Readability Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/85 to-transparent pointer-events-none" />
        </div>

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />

        {/* Content - Empty as requested */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-left pointer-events-none">
          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-white/60 mb-2">{item.category} / 2024</p>
          <h4 className="font-display text-2xl font-medium text-white">{item.client}</h4>
          <p className="text-sm text-white/70 mt-1">{item.description}</p>
        </div>

        {/* Animated border */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 border border-white/0 transition-all duration-300 pointers-events-none"
            animate={{
              borderColor: hoveredItem === item.id ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0)',
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

const FeaturedProjects = ({ items, isInView, onViewAll }) => {
  const isMobile = useIsMobile();
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        transition={{ delay: 0.5, ...TRANSITIONS.medium }}
        className="mb-20 container mx-auto px-4"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
            <div>
              <span className="section-kicker mb-5">Selected work</span>
              <h3 className="font-display text-4xl md:text-6xl font-medium tracking-[-0.05em] text-eerie">
                A few things I&apos;ve <span className="text-gradient">made.</span>
              </h3>
            </div>
            <p className="text-eerie/60 text-base max-w-xs md:text-right">
              Identity systems and packaging for ambitious people and useful ideas.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 max-w-7xl mx-auto">
          {items.map((item, index) => (
            <FeaturedCard key={item.id} item={item} index={index} isInView={isInView} onSelect={setSelectedItem} />
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1, ...TRANSITIONS.medium }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={onViewAll}
            whileHover={
              !isMobile
                ? {
                    scale: 1.05,
                    boxShadow: '0 20px 60px rgba(120, 119, 198, 0.5)',
                  }
                : {}
            }
            whileTap={{ scale: 0.95 }}
            data-cursor="More"
            className="group relative inline-flex items-center gap-3 px-7 py-4 border border-eerie/20 text-eerie font-semibold text-sm overflow-hidden"
          >
            <span className="relative z-10">View All Projects</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative z-10 text-xl md:text-2xl"
            >
              →
            </motion.span>
            {!isMobile && (
              <motion.div
                className="absolute inset-0 bg-crimson"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.button>
        </motion.div>
      </motion.div>
      <ProjectDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
};

export default FeaturedProjects;
