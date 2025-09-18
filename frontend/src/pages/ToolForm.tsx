import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { useEffect } from "react";

interface ToolFormData {
  id: number;
  name: string;
  description: string;
  category: string;
  website: string;
  pricing: string;
  released: string;
  company: string;
}

export default function ToolForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<ToolFormData>();

  useEffect(() => {
    if (id) {
      api.get(`/tools/${id}`).then((res) => reset(res.data));
    }
  }, [id, reset]);

  const onSubmit = async (data: ToolFormData) => {
    if (id) {
      await api.put(`/tools/${id}`, data);
    } else {
      await api.post("/tools", data);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow p-6 rounded max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">{id ? "Edit Tool" : "Add Tool"}</h2>

      <input {...register("name")} placeholder="Name" className="w-full border p-2 rounded" />
      <input {...register("website")} placeholder="Website" className="w-full border p-2 rounded" />
      <select {...register("category")} className="w-full border p-2 rounded">
        <option value="chatbot">Chatbot</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
        <option value="programing">Programming</option>
        <option value="other">Other</option>
      </select>
      <input {...register("pricing")} placeholder="Pricing" className="w-full border p-2 rounded" />
      <input {...register("company")} placeholder="Company" className="w-full border p-2 rounded" />
      <input {...register("released")} type="date" className="w-full border p-2 rounded" />
      <textarea {...register("description")} placeholder="Description" className="w-full border p-2 rounded" />

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Save
      </button>
    </form>
  );
}
