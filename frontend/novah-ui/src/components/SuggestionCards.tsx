import { motion } from 'framer-motion';
import { FileSearch, Globe, Code } from 'lucide-react';

const suggestions = [
  { icon: FileSearch, label: 'Files' },
  { icon: Globe, label: 'Web' },
  { icon: Code, label: 'Code' }
];

export default function SuggestionCards() {
  return (
    <div className="flex gap-4 mt-6 justify-center">
      {suggestions.map(({ icon: Icon, label }) => (
        <motion.div
          key={label}
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 rounded-xl p-4 backdrop-blur cursor-pointer flex flex-col items-center"
        >
          <Icon className="w-6 h-6" />
          <span className="text-sm mt-1">{label}</span>
        </motion.div>
      ))}
    </div>
  );
}
