import { motion, AnimatePresence } from 'framer-motion';
import PortfolioCard from './PortfolioCard';

const PortfolioGrid = ({ items, onSelect, density = 'grid' }) => {
  const isLoose = density === 'loose';
  const gridClass = isLoose
    ? 'grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto'
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';

  return (
    <AnimatePresence mode="wait">
      <motion.div layout className={gridClass}>
        {items.map((item, index) => (
          <PortfolioCard
            key={item.id}
            item={item}
            index={index}
            onSelect={onSelect}
            size={isLoose ? 'hero' : item.size}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default PortfolioGrid;
