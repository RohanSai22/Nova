import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PromptInput from '../components/PromptInput';

const suggestions = [
  'Search the web for AI news',
  'Plan my weekend trip',
  'Summarize the latest tech trends',
];

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const startChat = (value: string) => {
    const id = Date.now().toString();
    navigate(`/chat/${id}`, { state: { initial: value } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <img src="/logo192.png" alt="Novah" className="w-24 h-24" />
      <PromptInput value={prompt} onChange={setPrompt} onSubmit={() => startChat(prompt)} />
      <div className="flex flex-wrap justify-center gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => startChat(s)}
            className="backdrop-blur-sm bg-white/10 px-3 py-2 rounded text-sm hover:bg-white/20"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
