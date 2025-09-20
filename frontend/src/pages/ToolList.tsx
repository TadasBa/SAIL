import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

interface Tool {
  id: number;
  name: string;
  category: string;
  company: string;
}

// Customized Tailwind class for button
const baseButton =
  "px-4 py-2 inline-flex items-center justify-center text-gray-200 font-bold bg-white/10 shadow rounded-xl hover:cursor-pointer";

export default function ToolList() {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    api.get("/tools").then((res) => setTools(res.data));
  }, []);

  return (
    <div>
      {/* Add Tool button */}
      <div className="flex justify-center mb-10">
        <Link to="/create" className={baseButton}>
          + Add Tool
        </Link>
      </div>

      {/* Tools grid */}
      {tools.length === 0 ? (
        <p className="text-gray-600">No tools yet. Click “+ Add Tool”.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tools.map((t) => (
            <li
              key={t.id}
              className="p-4 bg-white/10 backdrop-blur shadow rounded-xl hover:shadow-lg hover:scale-105 transition-transform duration-150"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <Link
                    to={`/tools/${t.id}`}
                    className="text-lg font-semibold text-white hover:underline"
                  >
                    {t.name}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {t.category} — {t.company}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
