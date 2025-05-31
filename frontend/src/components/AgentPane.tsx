import React from 'react';
import { motion } from 'framer-motion';

interface AgentPaneProps {
  open: boolean;
  logs: string[];
  onCollapse: () => void;
}

const AgentPane: React.FC<AgentPaneProps> = ({ open, logs, onCollapse }) => {
  return (
    <motion.aside
      initial={{ x: '100%' }}
      animate={{ x: open ? 0 : '100%' }}
      transition={{ type: 'tween' }}
      className="fixed right-0 top-0 w-80 h-full bg-black/50 backdrop-blur p-4 overflow-y-auto"
    >
      <button className="mb-2 text-sm" onClick={onCollapse}>
        collapse ›
      </button>
      <div className="space-y-2">
        {logs.map((log, i) => (
          <pre key={i} className="text-xs text-white whitespace-pre-wrap">
            {log}
          </pre>
        ))}
      </div>
    </motion.aside>
  );
};

export default AgentPane;
