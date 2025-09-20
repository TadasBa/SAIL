import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { useEffect } from "react";

const baseButton = " w-full inline-flex items-center justify-center h-8 text-md font-medium border border-gray-200 bg-gray-50 shadow rounded hover:cursor-pointer";

interface ToolFormData {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow p-6 rounded max-w-lg mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold">
        {id ? "Edit Tool" : "Add New Tool"}
      </h2>

      <input
        {...register("name")}
        placeholder="Name"
        className="w-full border p-2 rounded"
        required
      />
      <input
        {...register("website")}
        placeholder="Website"
        className="w-full border p-2 rounded"
        required
      />
      <select {...register("category")} className="w-full border p-2 rounded">
        <option value="" disabled selected>Category</option>
        <option value="chatbot">Chatbot</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
        <option value="programing">Programming</option>
        <option value="other">Other</option>
      </select>
      
      <select {...register("pricing")} className="w-full border p-2 rounded">
        <option value="" disabled selected>Pricing</option>
        <option value="free">Free</option>
        <option value="paid">Paid</option>
      </select>
      <input
        {...register("company")}
        placeholder="Company"
        className="w-full border p-2 rounded"
        required
      />
      <input
        {...register("released")}
        type="date"
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        {...register("description")}
        placeholder="Description"
        className="w-full h-20 border p-2 rounded"
        required
      />

      <button
        type="submit"
        className={baseButton}
      >
        Save
      </button>
    </form>
  );
}
