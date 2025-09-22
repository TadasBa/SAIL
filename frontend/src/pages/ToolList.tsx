import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

interface Tool {
  id: number;
  name: string;
  category: string;
  company: string;
}

const btn =
  "inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 hover:bg-white/15 px-4 py-2 text-sm font-medium text-slate-100";
const card =
  "p-4 rounded-2xl border-1 border-white/10 bg-white/5 hover:bg-white/10 hover:scale-103 transition shadow";

export default function ToolList() {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    api.get("/tools").then((res) => setTools(res.data));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tools</h2>
        <Link to="/create" className={btn}>+ Add Tool</Link>
      </div>

      {tools.length === 0 ? (
        <p className="text-slate-300/80">No tools yet. Click “+ Add Tool”.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tools.map((t) => (
            <li key={t.id} className={card}>
              <Link to={`/tools/${t.id}`} className="text-lg font-semibold text-white hover:underline">
                {t.name}
              </Link>
              <p className="text-sm text-slate-300/80">
                {t.category} — {t.company}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
