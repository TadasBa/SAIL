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

export default function ToolDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState<Tool | null>(null);

  useEffect(() => {
    api
      .get(`/tools/${id}`)
      .then((res) => setTool(res.data))
      .catch(() => setTool(null));
  }, [id]);

  const handleDelete = async () => {
    if (!tool) return;
    if (!confirm("Are you sure you want to delete this tool?")) return;
    await api.delete(`/tools/${tool.id}`);
    navigate("/");
  };

  if (!tool) return <p className="text-gray-600">Tool not found.</p>;

  return (
    <div className="bg-white shadow p-6 rounded max-w-lg mx-auto space-y-2">
      <h2 className="text-2xl font-bold">{tool.name}</h2>
      <p>{tool.description}</p>
      <p>
        <strong>Category:</strong> {tool.category}
      </p>
      <p>
        <strong>Website:</strong>{" "}
        <a
          href={tool.website}
          className="text-blue-600 underline"
          target="_blank"
        >
          {tool.website}
        </a>
      </p>
      <p>
        <strong>Pricing:</strong> {tool.pricing}
      </p>
      <p>
        <strong>Company:</strong> {tool.company}
      </p>
      <p>
        <strong>Released:</strong> {tool.released}
      </p>

      <div className="flex gap-2 mt-4">
        <Link
          to={`/edit/${tool.id}`}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
