import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Outlet />
    </div>
  );
}
