import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

export default function ToolDetails() {
  const { id } = useParams();
  const [tool, setTool] = useState<Tool | null>(null);

  useEffect(() => {
    api.get(`/tools/${id}`).then((res) => setTool(res.data));
  }, [id]);

  if (!tool) return <p className="text-red-500">Tool not found.</p>;

  return (
    <div className="bg-white shadow p-6 rounded max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{tool.name}</h2>
      <p className="mb-2">{tool.description}</p>
      <p><strong>Category:</strong> {tool.category}</p>
      <p><strong>Website:</strong> <a href={tool.website} className="text-blue-600 underline">{tool.website}</a></p>
      <p><strong>Pricing:</strong> {tool.pricing}</p>
      <p><strong>Company:</strong> {tool.company}</p>
      <p><strong>Released:</strong> {tool.released}</p>
      <Link to={`/edit/${tool.id}`} className="mt-4 inline-block px-4 py-2 bg-yellow-500 text-white rounded">Edit</Link>
    </div>
  );
}
