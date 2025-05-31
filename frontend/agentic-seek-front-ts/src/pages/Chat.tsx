import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Message, PlanStep } from '../types';
import PromptInput from '../components/PromptInput';
import ChatBubble from '../components/ChatBubble';
import AgentPane from '../components/AgentPane';
import FinalReportCard from '../components/FinalReportCard';

export default function Chat() {
  const location = useLocation();
  const initial = (location.state as any)?.initial || '';
  const [prompt, setPrompt] = useState(initial);
  const [messages, setMessages] = useState<Message[]>(initial ? [{ id: '0', type: 'user', content: initial }] : []);
  const [plan, setPlan] = useState<PlanStep[]>([]);
  const [showPane, setShowPane] = useState(false);
  const [result, setResult] = useState('');
  const [screenshot, setScreenshot] = useState<string>('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLatestAnswer();
      fetchPlan();
      fetchScreenshot();
    }, 3000);
    return () => clearInterval(interval);
  }, [messages]);

  const fetchLatestAnswer = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/latest_answer');
      const data = res.data;
      if (data.answer) {
        setMessages((prev) => [...prev, { id: Date.now().toString(), type: 'agent', content: data.answer }]);
        if (data.done) setResult(data.answer);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPlan = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/current_plan');
      if (res.data.plan) {
        setPlan(res.data.plan);
        setShowPane(true);
      }
    } catch {}
  };

  const fetchScreenshot = async () => {
    try {
      const timestamp = Date.now();
      const res = await axios.get(`http://127.0.0.1:8000/screenshots/updated_screen.png?timestamp=${timestamp}`, { responseType: 'blob' });
      const url = URL.createObjectURL(res.data);
      setScreenshot((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    } catch {}
  };

  const sendPrompt = async () => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), type: 'user', content: prompt }]);
    setPrompt('');
    try {
      await axios.post('http://127.0.0.1:8000/query', { query: prompt, tts_enabled: false });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-screen">
      <div className="w-60 bg-slate-800 p-4 hidden md:block">
        <button className="mb-2 px-3 py-1 bg-blue-600 rounded w-full">New Chat</button>
        {/* Placeholder for threads */}
      </div>
      <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m) => (
          <ChatBubble key={m.id} message={m} />
        ))}
        {screenshot && (
          <img src={screenshot} alt="screenshot" className="max-w-full border" />
        )}
        <div ref={bottomRef} />
      </div>
        <div className="p-4 border-t border-slate-700">
          <PromptInput value={prompt} onChange={setPrompt} onSubmit={sendPrompt} />
        </div>
        <FinalReportCard result={result} />
      </div>
      <AgentPane open={showPane} steps={plan} />
    </div>
  );
}
