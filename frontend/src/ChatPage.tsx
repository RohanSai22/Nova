import React, { useState } from 'react';
import MessageStream from './components/MessageStream';
import AgentPane from './components/AgentPane';
import StatusChip from './components/StatusChip';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  tool?: string;
  running?: boolean;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [paneOpen, setPaneOpen] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), role: 'user', content: input };
    setMessages((m) => [...m, userMsg]);
    setInput('');

    const planId = Date.now() + 1;
    setMessages((m) => [
      ...m,
      { id: planId, role: 'assistant', content: 'Thinking...', tool: '[ Planning… ]', running: true },
    ]);
    setPaneOpen(true);
    setLogs((l) => [...l, 'Planner: planning']);

    setTimeout(() => {
      setMessages((m) =>
        m.map((msg) =>
          msg.id === planId ? { ...msg, tool: '[ Planning ]', running: false } : msg
        )
      );
      setLogs((l) => [...l, 'Planner: done']);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="flex-1 p-4 overflow-y-auto">
        <MessageStream messages={messages} />
        <div className="mt-4 flex">
          <input
            className="flex-1 bg-gray-800 p-2 rounded-l"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Novah..."
          />
          <button className="bg-[#6C5DD3] px-4 rounded-r" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
      <AgentPane open={paneOpen} logs={logs} onCollapse={() => setPaneOpen(false)} />
    </div>
  );
};

export default ChatPage;
