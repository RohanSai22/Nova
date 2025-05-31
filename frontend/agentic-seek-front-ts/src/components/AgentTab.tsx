interface Props {
  name: string;
  active: boolean;
  onClick: () => void;
}

export default function AgentTab({ name, active, onClick }: Props) {
  const base = active ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600';
  return (
    <button onClick={onClick} className={`px-3 py-1 rounded ${base}`}>{name}</button>
  );
}
