import { PlanStep } from '../types';
import { motion } from 'framer-motion';

interface Props {
  open: boolean;
  steps: PlanStep[];
}

export default function AgentPane({ open, steps }: Props) {
  return (
    <motion.aside
      initial={{ x: '100%' }}
      animate={{ x: open ? 0 : '100%' }}
      transition={{ type: 'tween' }}
      className="fixed right-0 top-0 bottom-0 w-64 bg-slate-800 p-4 overflow-y-auto"
    >
      <h2 className="text-lg font-semibold mb-2">PlannerAgent</h2>
      <ol className="space-y-1 text-sm">
        {steps.map((s, i) => (
          <li key={i} className="border-b border-slate-700 pb-1">
            <p className="font-medium">{s.task_name}</p>
            <p className="text-xs text-slate-300">{s.description}</p>
          </li>
        ))}
      </ol>
    </motion.aside>
  );
}
