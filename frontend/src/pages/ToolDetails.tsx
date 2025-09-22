import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api";

interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  website: string;
  pricing: string;
  released: string;
  company: string;
}

const btn =
  "inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 hover:bg-white/15 px-3 py-2 text-sm font-medium text-slate-100";

const fmt = (d?: string) => {
  if (!d) return "-";
  const dt = new Date(d);
  return isNaN(dt.getTime()) ? d : dt.toLocaleDateString();
};

export default function ToolDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState<Tool | null>(null);

  useEffect(() => {
    api.get(`/tools/${id}`).then((res) => setTool(res.data)).catch(() => setTool(null));
  }, [id]);

  const handleDelete = async () => {
    if (!tool) return;
    if (!confirm("Delete this tool?")) return;
    await api.delete(`/tools/${tool.id}`);
    navigate("/");
  };

  if (!tool) return <p className="text-slate-300/80">Tool not found.</p>;

  return (
    <div className="bg-white/5 text-white backdrop-blur shadow p-6 rounded-2xl border border-white/10 max-w-xl">
      <h2 className="text-2xl font-bold mb-2">{tool.name}</h2>
      <p className="text-slate-300/90 mb-3">{tool.description}</p>

      <p><strong>Category:</strong> {tool.category}</p>
      <p>
        <strong>Website:</strong>{" "}
        <a href={tool.website} className="underline" target="_blank" rel="noreferrer">
          {tool.website}
        </a>
      </p>
      <p><strong>Pricing:</strong> {tool.pricing}</p>
      <p><strong>Company:</strong> {tool.company}</p>
      <p><strong>Released:</strong> {fmt(tool.released)}</p>

      <div className="flex gap-2 pt-4">
        <Link to={`/edit/${tool.id}`} className={btn}>Edit</Link>
        <button onClick={handleDelete} className={btn}>Delete</button>
      </div>
    </div>
  );
}
