import React from 'react';

interface ToolCardProps {
  children: React.ReactNode;
  className?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`rounded-2xl bg-white/5 backdrop-blur p-4 shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default ToolCard;
