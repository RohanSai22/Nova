import { ToolOutput } from '../types';
import { useState } from 'react';

interface Props {
  blocks: ToolOutput[] | null;
}

export default function AgentWorkspace({ blocks }: Props) {
  const [open, setOpen] = useState(true);
  if (!blocks) return null;
  const grouped = blocks.reduce<Record<string, ToolOutput[]>>((acc, b) => {
    (acc[b.tool_type] = acc[b.tool_type] || []).push(b);
    return acc;
  }, {});
  return (
    <div className={`transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'} w-80 border-l border-white/20 p-4 overflow-y-auto bg-[#0f172a]`}>
      <button className="text-xs underline mb-2" onClick={() => setOpen(!open)}>{open ? 'Collapse ‹' : 'Expand ›'}</button>
      {Object.entries(grouped).map(([tool, arr]) => (
        <div key={tool} className="mb-4">
          <div className="font-bold mb-1">{tool}</div>
          {arr.map((b, i) => (
            <pre key={i} className="bg-black/30 p-2 rounded text-xs whitespace-pre-wrap mb-2">{b.block}</pre>
          ))}
        </div>
      ))}
    </div>
  );
}
