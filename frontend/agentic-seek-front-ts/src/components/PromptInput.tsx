import { FormEvent } from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}

export default function PromptInput({ value, onChange, onSubmit }: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <input
        className="w-full px-4 py-2 rounded bg-white/20 backdrop-blur-md placeholder-gray-300 focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ask Novah..."
      />
    </form>
  );
}
