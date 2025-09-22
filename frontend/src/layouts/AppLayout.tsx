import { Outlet, NavLink } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  const link =
    "rounded px-2 py-1 text-sm hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/10";

  return (
    <div className="min-h-screen bg-neutral-900 text-slate-100">
      {/* Mobile: tiny text-only top nav */}
      <header className="md:hidden sticky top-0 z-10 border-b border-white/10 bg-black/30 backdrop-blur px-4 py-3">
        <nav aria-label="Primary" className="flex items-center gap-3">
          <NavLink to="/" end className={link}>
            Home
          </NavLink>
          <NavLink to="/create" className={link}>
            Add Tool
          </NavLink>
        </nav>
      </header>

      {/* Desktop: sidebar flush left */}
      <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block sticky top-0 h-screen border-r border-white/10 p-4">
          <Sidebar />
        </aside>

        <div className="flex min-h-screen flex-col">
          <main className="p-1 md:p-10">
            <Outlet />
          </main>
          <div className="my-20 border-t border-white/10" />
        </div>
      </div>
    </div>
  );
}
