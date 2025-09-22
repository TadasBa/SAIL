import { NavLink } from "react-router-dom";

type Props = Readonly<{ onNavigate?: () => void }>;

export default function Sidebar({ onNavigate }: Props) {
  const link =
    "block rounded-lg px-3 py-2 text-sm transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/10";

  return (
    <nav className="flex h-full flex-col">
      <div className="mb-6 px-2">
        <h1 className="text-lg font-semibold">SAIL</h1>
        <p className="text-xs opacity-70">Smart AI Library</p>
      </div>

      <ul className="space-y-1">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `${link} ${isActive ? "bg-white/10" : "opacity-90"}`}
            onClick={onNavigate}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/create"
            className={({ isActive }) => `${link} ${isActive ? "bg-white/10" : "opacity-90"}`}
            onClick={onNavigate}
          >
            Add Tool
          </NavLink>
        </li>
      </ul>

      <div className="my-4 border-t border-white/10" />

      <div className="px-2 mb-2 text-xs uppercase tracking-wide opacity-60">Structure</div>
      <ul className="space-y-1">
        <li>
          <span className="block rounded-lg px-3 py-2 text-sm opacity-50 select-none border border-white/5">
            Categories (coming soon)
          </span>
        </li>
        <li>
          <span className="block rounded-lg px-3 py-2 text-sm opacity-50 select-none border border-white/5">
            Reports (placeholder)
          </span>
        </li>
      </ul>
    </nav>
  );
}
