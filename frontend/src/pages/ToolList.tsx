import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

interface Tool {
  id: number;
  name: string;
  category: string;
  company: string;
}

export default function ToolList() {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    api.get("/tools").then((res) => setTools(res.data));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this tool?")) return;
    await api.delete(`/tools/${id}`);
    setTools(tools.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Tools</h1>

      {tools.length === 0 ? (
        <p className="text-gray-600">No tools yet. Click “+ Add Tool”.</p>
      ) : (
        <ul className="grid gap-4">
          {tools.map((t) => (
            <li
              key={t.id}
              className="p-4 bg-white rounded shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <Link
                    to={`/tools/${t.id}`}
                    className="text-lg font-semibold text-blue-600 hover:underline"
                  >
                    {t.name}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {t.category} — {t.company}
                  </p>
                </div>
                <div className="space-x-2">
                  <Link
                    to={`/edit/${t.id}`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
