import React from 'react';

interface StatusChipProps {
  label: string;
  running?: boolean;
}

const StatusChip: React.FC<StatusChipProps> = ({ label, running }) => {
  return (
    <span
      className={`px-2 py-1 text-xs rounded-full border border-[#6C5DD3] text-[#6C5DD3] mr-2 ${running ? 'animate-pulse' : ''}`}
    >
      {label} {!running && '✅'}
    </span>
  );
};

export default StatusChip;
