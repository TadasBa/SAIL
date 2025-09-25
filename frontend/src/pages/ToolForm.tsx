import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

type ToolFormData = {
  name: string;
  description: string;
  category: string
  website: string;
  pricing: string;
  released: string;
  company: string;
};

const INPUT   = "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 placeholder:text-slate-400 focus:outline-none";
const TEXTBOX = "w-full min-h-24 bg-white/5 border border-white/10 rounded-xl px-3 py-2 placeholder:text-slate-400 focus:outline-none";
const SELECT  = "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus:outline-none";
const BTN     = "w-full inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 hover:bg-white/15 px-4 py-2 text-sm font-medium text-slate-100";

export default function ToolForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);

  const { register, handleSubmit, reset } = useForm<ToolFormData>({
    defaultValues: {
      name: "",
      website: "",
      category: "",
      pricing: "",
      company: "",
      released: "",
      description: "",
    },
  });

  // Load categories
  useEffect(() => {
    api
      .get<string[]>("/tools/categories")
      .then((res) => setCategories(res.data))
      .catch(() => setCategories(["other"]));
  }, []);

  useEffect(() => {
    if (!id) return;
    api.get<ToolFormData>(`/tools/${id}`).then((res) => {
      const d = res.data;
      reset({ ...d, released: (d.released || "").slice(0, 10) });
    });
  }, [id, reset]);

  const onSubmit = async (data: ToolFormData) => {
    if (id) await api.put(`/tools/${id}`, data);
    else await api.post("/tools", data);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="text-2xl font-bold">{id ? "Edit Tool" : "Add New Tool"}</h2>

      <input {...register("name")} placeholder="Name" className={INPUT} required />
      <input {...register("website")} placeholder="Website (https://…)" className={INPUT} type="url" required />

      <div className="grid gap-4 sm:grid-cols-2">
        <select {...register("category")} className={SELECT} required defaultValue="">
          <option value="" disabled>Category</option>
          {categories.map((c) => (
            <option key={c} value={c} className="text-black">{c}</option>
          ))}
        </select>

        <select {...register("pricing")} className={SELECT} required defaultValue="">
          <option value="" disabled>Pricing</option>
          <option value="free" className="text-black">Free</option>
          <option value="paid" className="text-black">Paid</option>
        </select>
      </div>

      <input {...register("company")} placeholder="Company" className={INPUT} required />
      <input {...register("released")} type="date" className={INPUT} required />
      <textarea {...register("description")} placeholder="Description" className={TEXTBOX}/>

      <button type="submit" className={BTN}>Save</button>
    </form>
  );
}
