import ReactMarkdown from 'react-markdown';
import { Message } from '../types';

interface Props {
  message: Message;
}

export default function ChatBubble({ message }: Props) {
  const base = message.type === 'user' ? 'bg-blue-600 self-end' : 'bg-gray-700';
  return (
    <div className={`rounded p-3 my-2 max-w-xl ${base}`}>
      <ReactMarkdown>{message.content}</ReactMarkdown>
    </div>
  );
}
