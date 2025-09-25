import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api";

type Tool = {
  id: number;
  name: string;
  description: string;
  category: string;
  website: string;
  pricing: string;
  released: string;
  company: string;
};

const BTN = "inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 hover:bg-white/15 px-3 py-2 text-sm font-medium text-slate-100 transition-colors";

export default function ToolDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState<Tool | null>(null);

  useEffect(() => {
    if (!id) return;
    api
      .get<Tool>(`/tools/${id}`)
      .then((res) => setTool(res.data))
      .catch(() => setTool(null));
  }, [id]);

  const handleDelete = async () => {
    if (!tool) return;
    if (!confirm("Delete this tool?")) return;
    await api.delete(`/tools/${tool.id}`);
    navigate("/");
  };

  if (!tool) return <p className="text-slate-300/80">Tool not found.</p>;

  return (
    <section className="max-w-xl mx-auto space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow">
      <h1 className="text-2xl font-semibold">{tool.name}</h1>
      <p className="text-slate-300/90">{tool.description}</p>

      <ul className="text-sm space-y-1">
        <li><b>Category:</b> {tool.category}</li>
        <li><b>Website:</b>{" "} <a href={tool.website} target="_blank" rel="noreferrer" className="underline"> {tool.website}</a></li>
        <li><b>Pricing:</b> {tool.pricing}</li>
        <li><b>Company:</b> {tool.company}</li>
        <li><b>Released:</b> {tool.released?.slice(0, 10) || "-"}</li>
      </ul>

      <div className="flex gap-2 pt-2">
        <Link to={`/edit/${tool.id}`} className={BTN}>Edit</Link>
        <button onClick={handleDelete} className={BTN}>Delete</button>
      </div>
    </section>
  );
}
