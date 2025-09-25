import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import api from "../api";

export default function Sidebar() {
  const [categories, setCategories] = useState<string[]>([]);
  const [params] = useSearchParams();
  const selected = params.get("category"); // null = All

  useEffect(() => {
    api
      .get<string[]>("/tools/categories")
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  const LINK = "block rounded-lg px-3 py-2 text-sm hover:bg-white/10 transition-colors";

  return (
    <nav className="flex h-full flex-col">
      <div className="mb-6 px-2"> 
        <h1 className="text-lg font-semibold">SAIL</h1> 
        <p className="text-xs opacity-70">Smart AI Library</p> 
      </div>

      <div className="space-y-1">
        <NavLink to="/" end className={({ isActive }) =>`${LINK} ${isActive && !selected ? "bg-white/10" : "opacity-90"}`}>Home</NavLink>
      </div>

      <div className="my-4 border-t border-white/10" />

      <div className="px-2 mb-2 text-xs uppercase tracking-wide opacity-60">Categories</div>
      <ul className="space-y-1">
        <li>
          <NavLink to="/" className={`${LINK} ${!selected ? "bg-white/10" : "opacity-90"}`}>All</NavLink>
        </li>
        {categories.map((cat) => (
          <li key={cat}>
            <NavLink to={`/?category=${encodeURIComponent(cat)}`}className={`${LINK} ${selected === cat ? "bg-white/10" : "opacity-90"}`}>{cat}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
