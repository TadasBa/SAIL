import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

type Category = "chatbot" | "image" | "video" | "programing" | "other";
type Pricing = "free" | "paid";

interface ToolFormData {
  name: string;
  description: string;
  category: Category | "";
  website: string;
  pricing: Pricing | "";
  released: string; // yyyy-mm-dd
  company: string;
}

const input =
  "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-white/20 placeholder:text-slate-400";
const textarea =
  "w-full min-h-24 bg-white/5 border border-white/10 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-white/20 placeholder:text-slate-400";
const select =
  "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-white/20";
const btn =
  "w-full inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 hover:bg-white/15 px-4 py-2 text-sm font-medium text-slate-100";
const err = "text-sm text-red-300 mt-1";

export default function ToolForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ToolFormData>({
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

  useEffect(() => {
    if (!id) return;
    api.get(`/tools/${id}`).then((res) => {
      const d = res.data as ToolFormData;
      const released = (d.released || "").slice(0, 10); // ensure yyyy-mm-dd for <input type="date">
      reset({ ...d, released });
    });
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
      className="bg-white/5 text-white backdrop-blur shadow p-6 rounded-2xl border border-white/10 max-w-xl mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold">{id ? "Edit Tool" : "Add New Tool"}</h2>

      <div>
        <input
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "At least 2 characters" },
          })}
          placeholder="Name"
          className={input}
        />
        {errors.name && <p className={err}>{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register("website", {
            required: "Website is required",
            pattern: {
              value: /^https?:\/\/.+/i,
              message: "Must start with http:// or https://",
            },
          })}
          placeholder="Website (https://…)"
          className={input}
        />
        {errors.website && <p className={err}>{errors.website.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <select
            {...register("category", { required: "Choose a category" })}
            className={select}
            defaultValue=""
          >
            <option value="" disabled>
              Category
            </option>
            <option value="chatbot" className="text-black">Chatbot</option>
            <option value="image" className="text-black">Image</option>
            <option value="video" className="text-black">Video</option>
            <option value="programing" className="text-black">Programming</option>
            <option value="other" className="text-black">Other</option>
          </select>
          {errors.category && <p className={err}>{errors.category.message}</p>}
        </div>

        <div>
          <select
            {...register("pricing", { required: "Choose pricing" })}
            className={select}
            defaultValue=""
          >
            <option value="" disabled>
              Pricing
            </option>
            <option value="free" className="text-black">Free</option>
            <option value="paid" className="text-black">Paid</option>
          </select>
          {errors.pricing && <p className={err}>{errors.pricing.message}</p>}
        </div>
      </div>

      <div>
        <input
          {...register("company", { required: "Company is required" })}
          placeholder="Company"
          className={input}
        />
        {errors.company && <p className={err}>{errors.company.message}</p>}
      </div>

      <div>
        <input
          {...register("released", {
            required: "Release date is required",
            validate: (v) =>
              /^\d{4}-\d{2}-\d{2}$/.test(v) || "Pick a valid date",
          })}
          type="date"
          className={input}
        />
        {errors.released && <p className={err}>{errors.released.message}</p>}
      </div>

      <div>
        <textarea
          {...register("description", {
            required: "Description is required",
            minLength: { value: 10, message: "At least 10 characters" },
          })}
          placeholder="Description"
          className={textarea}
        />
        {errors.description && <p className={err}>{errors.description.message}</p>}
      </div>

      <button type="submit" className={btn} disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
