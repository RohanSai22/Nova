import { motion } from 'framer-motion';

interface Props {
  text: string;
  status: 'pending' | 'success' | 'failed';
}

export default function PlanItem({ text, status }: Props) {
  const variants = {
    success: { scale: 1, backgroundColor: '#15803d' },
    failed: { scale: 1, backgroundColor: '#b91c1c' },
    pending: { scale: 1, backgroundColor: '#374151' }
  };
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, ...variants[status] }}
      className="p-2 rounded-xl mb-1"
    >
      {text}
    </motion.li>
  );
}
