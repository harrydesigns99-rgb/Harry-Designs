import { motion, AnimatePresence } from 'framer-motion';
import PortfolioCard from './PortfolioCard';

const PortfolioGrid = ({ items, onSelect }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <PortfolioCard
            key={item.id}
            item={item}
            index={index}
            onSelect={onSelect}
            size={item.size}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default PortfolioGrid;
