import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-neutral-900 text-slate-100">
      <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block border-r border-white/10 p-4">
          <Sidebar />
        </aside>

        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
