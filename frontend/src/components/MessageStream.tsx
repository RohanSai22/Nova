import React from 'react';
import ToolCard from './ToolCard';
import StatusChip from './StatusChip';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  tool?: string;
  running?: boolean;
};

interface MessageStreamProps {
  messages: Message[];
}

const MessageStream: React.FC<MessageStreamProps> = ({ messages }) => {
  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className="flex w-full">
          {msg.role === 'assistant' ? (
            <div className="flex flex-col items-start w-full">
              <ToolCard>
                <p className="text-sm text-white mb-2">{msg.content}</p>
                {msg.tool && (
                  <StatusChip label={msg.tool} running={msg.running} />
                )}
              </ToolCard>
            </div>
          ) : (
            <div className="ml-auto max-w-md">
              <div className="bg-transparent border border-[#6C5DD3] text-white rounded-full px-4 py-2 text-right">
                {msg.content}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageStream;
