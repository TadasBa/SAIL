import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api";

type Tool = { id: number; name: string; category: string; company: string };

const BUTTON = "inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 hover:bg-white/15 px-4 py-2 text-sm font-medium text-slate-100 transition-colors";
const CARD = "p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 shadow transition-colors";

export default function ToolList() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [params] = useSearchParams();
  const selected = params.get("category");

  useEffect(() => {
    api
      .get<Tool[]>("/tools")
      .then((res) => setTools(res.data))
      .catch((err) => console.error("GET /tools failed:", err));
  }, []);

  const visible = selected ? tools.filter((t) => t.category === selected) : tools;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tools</h2>
        <Link to="/create" className={BUTTON}>+ Add Tool</Link>
      </div>

      {visible.length === 0 ? (
        <p className="text-slate-300/80"> {selected ? `No tools in "${selected}" yet.` : 'No tools yet. Click “+ Add Tool”.'}</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((t) => (
            <li key={t.id} className={CARD}>
              <Link to={`/tools/${t.id}`} className="text-lg font-semibold text-white hover:underline">{t.name}</Link>
              <p className="text-sm text-slate-300/80">{t.category} — {t.company}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
