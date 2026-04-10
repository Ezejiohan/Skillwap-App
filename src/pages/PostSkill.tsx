import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { SkillCategory, SkillType } from "../types/skill";
import { useSkillStore } from "../store/skillStores";
import { CATEGORIES, ANIMATION, VALIDATION } from "../constants";
import { generateAvatar, parseTags } from "../utils";

interface FormData {
  title: string;
  category: SkillCategory;
  description: string;
  type: SkillType;
  tagsRaw: string;
  userName: string;
  userBio: string;
  contact: string;
}

const inputCls = (err?: boolean) =>
  `w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border text-sm text-white placeholder-[#4a4a60] outline-none transition-colors ${
    err ? "border-red-500 focus:border-red-400" : "border-white/[0.07] focus:border-indigo-500"
  }`;

const PostSkill = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>({
    defaultValues: { type: "offer" },
  });
  const addSkill = useSkillStore((s) => s.addSkill);
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const typeVal = watch("type");

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitting(true);
      
      const tags = parseTags(data.tagsRaw, VALIDATION.MAX_TAGS_COUNT);
      const avatar = generateAvatar(data.userName);

      // Validate required fields
      if (!data.title.trim() || !data.description.trim() || !data.contact.trim()) {
        throw new Error("Please fill in all required fields");
      }

      addSkill({
        id: uuidv4(),
        title: data.title.trim(),
        category: data.category,
        description: data.description.trim(),
        type: data.type,
        tags,
        user: {
          name: data.userName.trim(),
          avatar,
          bio: data.userBio.trim(),
          contact: data.contact.trim(),
        },
        createdAt: new Date().toISOString(),
      });

      setDone(true);
      reset();
      setTimeout(() => navigate("/explore"), ANIMATION.REDIRECT_DELAY);
    } catch (error) {
      console.error("Error posting skill:", error);
      alert(error instanceof Error ? error.message : "Failed to post skill. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION.TRANSITION_MEDIUM }}
        className="w-full max-w-lg bg-[#111118] border border-white/[0.07] rounded-2xl p-8"
      >
        <h1 className="font-syne text-2xl font-extrabold tracking-tight mb-1">
          Post a Skill
        </h1>
        <p className="text-sm text-[#7a7a90] mb-7">
          Share what you can teach, or something you'd like to learn.
        </p>

        {done ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 py-10 text-green-400"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/25 flex items-center justify-center font-syne text-2xl font-extrabold">
              ✓
            </div>
            <p className="font-medium">Skill posted! Redirecting…</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Type toggle */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#7a7a90] uppercase tracking-wider">
                I am…
              </label>
              <div className="flex gap-2">
                {(["offer", "request"] as const).map((t) => (
                  <label
                    key={t}
                    className={`flex-1 py-3 text-center text-sm font-semibold rounded-xl border cursor-pointer transition-all ${
                      typeVal === t
                        ? t === "offer"
                          ? "bg-green-500/10 border-green-500/30 text-green-400"
                          : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                        : "bg-transparent border-white/[0.07] text-[#7a7a90] hover:border-white/15 hover:text-white"
                    }`}
                  >
                    <input {...register("type")} type="radio" value={t} className="hidden" />
                    ✦ {t === "offer" ? "Offering a Skill" : "Requesting a Skill"}
                  </label>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.07]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#4a4a60]">
                Skill Details
              </span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="title" className="text-xs font-semibold text-[#7a7a90]">
                Skill Title *
              </label>
              <input
                id="title"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: VALIDATION.MIN_TITLE_LENGTH,
                    message: "Title is required",
                  },
                  maxLength: {
                    value: VALIDATION.MAX_TITLE_LENGTH,
                    message: `Max ${VALIDATION.MAX_TITLE_LENGTH} characters`,
                  },
                })}
                placeholder="e.g. React Tutoring, Spanish Lessons"
                className={inputCls(!!errors.title)}
                disabled={submitting}
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? "title-error" : undefined}
              />
              {errors.title && (
                <span id="title-error" className="text-xs text-red-400">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="category" className="text-xs font-semibold text-[#7a7a90]">
                  Category *
                </label>
                <select
                  id="category"
                  {...register("category", { required: "Category is required" })}
                  className={inputCls(!!errors.category) + " appearance-none cursor-pointer"}
                  disabled={submitting}
                  aria-invalid={!!errors.category}
                >
                  <option value="">Select…</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="text-xs text-red-400">{errors.category.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="tags" className="text-xs font-semibold text-[#7a7a90]">
                  Tags
                </label>
                <input
                  id="tags"
                  {...register("tagsRaw")}
                  placeholder="React, TypeScript (comma separated)"
                  className={inputCls()}
                  disabled={submitting}
                  aria-describedby="tags-hint"
                />
                <p id="tags-hint" className="text-[10px] text-[#4a4a60]">
                  Max {VALIDATION.MAX_TAGS_COUNT} tags
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="description" className="text-xs font-semibold text-[#7a7a90]">
                Description *
              </label>
              <textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: VALIDATION.MIN_DESCRIPTION_LENGTH,
                    message: `At least ${VALIDATION.MIN_DESCRIPTION_LENGTH} characters`,
                  },
                  maxLength: {
                    value: VALIDATION.MAX_DESCRIPTION_LENGTH,
                    message: `Max ${VALIDATION.MAX_DESCRIPTION_LENGTH} characters`,
                  },
                })}
                placeholder="Describe the skill, what you'll cover, experience level…"
                rows={4}
                className={inputCls(!!errors.description) + " resize-none"}
                disabled={submitting}
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <span className="text-xs text-red-400">{errors.description.message}</span>
              )}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.07]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#4a4a60]">
                Your Profile
              </span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="userName" className="text-xs font-semibold text-[#7a7a90]">
                  Your Name *
                </label>
                <input
                  id="userName"
                  {...register("userName", { required: "Name is required" })}
                  placeholder="Full name"
                  className={inputCls(!!errors.userName)}
                  disabled={submitting}
                  aria-invalid={!!errors.userName}
                />
                {errors.userName && (
                  <span className="text-xs text-red-400">{errors.userName.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact" className="text-xs font-semibold text-[#7a7a90]">
                  Contact Email *
                </label>
                <input
                  id="contact"
                  type="email"
                  {...register("contact", {
                    required: "Email is required",
                    pattern: {
                      value: VALIDATION.EMAIL_REGEX,
                      message: "Invalid email format",
                    },
                  })}
                  placeholder="you@example.com"
                  className={inputCls(!!errors.contact)}
                  disabled={submitting}
                  aria-invalid={!!errors.contact}
                />
                {errors.contact && (
                  <span className="text-xs text-red-400">{errors.contact.message}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="userBio" className="text-xs font-semibold text-[#7a7a90]">
                Short Bio
              </label>
              <input
                id="userBio"
                {...register("userBio", {
                  maxLength: {
                    value: VALIDATION.MAX_BIO_LENGTH,
                    message: `Max ${VALIDATION.MAX_BIO_LENGTH} characters`,
                  },
                })}
                placeholder="A sentence about yourself"
                className={inputCls()}
                disabled={submitting}
                aria-describedby="bio-hint"
              />
              <p id="bio-hint" className="text-[10px] text-[#4a4a60]">
                Optional • Max {VALIDATION.MAX_BIO_LENGTH} characters
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 w-full py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/25 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              aria-busy={submitting}
            >
              {submitting
                ? "Posting…"
                : typeVal === "offer"
                  ? "Post Skill Offer"
                  : "Post Skill Request"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default PostSkill;
