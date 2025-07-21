"use client";

import { useForm, Controller } from "react-hook-form";
import MarkdownEditor from "../../../../components/MarkdownEditor";
import { useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogPostSchema } from "../../../../schema/blog.schema";
import { useRouter } from "next/navigation";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';


export default function CreateBlogPage() {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(blogPostSchema),
  });

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [error, setError] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("on submit clicked ",data)
    try {
      handletagSubmit()
      console.log(data)
      const response = await axios.post("/api/blog", data);
      if (response.status === 201) {
        router.push("/admin/dashboard");
      } else {
        setError(response.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error saving blog:", err);
    }
  };

  const handletagSubmit = ()=>{
    setValue("tag",tags,{ shouldValidate: true })
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const uploadResponse = await axios.post("/api/uploadimage", formData);

      const imageUrl = uploadResponse.data.imageUrl;
      setUploadedImageUrl(imageUrl);
      setValue("featureImage", imageUrl, { shouldValidate: true });
    } catch (err) {
      alert("Image upload failed. Please try again.");
      setUploadedImageUrl("");
    } finally {
      setIsUploading(false);
    }
  };

  

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = tagInput.trim();

      if (trimmed && !tags.includes(trimmed)) {
        const updated = [...tags, trimmed];
        setTags(updated);
        setValue("tags", updated, { shouldValidate: true });
      }

      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    const updated = tags.filter((t) => t !== tagToRemove);
    setTags(updated);
    setValue("tags", updated, { shouldValidate: true });
  };

  return (
     <Popup
              trigger={
                <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                  Create a New Blog
                </button>
              }
              modal
              contentStyle={{
                width: "60%",
                maxHeight: "80vh",
                overflow: "auto",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              {(close) => (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-2xl font-semibold mb-4 text-center text-[#08807a]">Edit Project</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Title */}
        <div>
          <label className="text-persian-green-700 dark:text-persian-green-200 mb-1 block text-sm font-semibold">
            Title
          </label>
          <input
            type="text"
            {...register("title")}
            className="border-persian-green-300 focus:border-persian-green-500 focus:ring-persian-green-400 dark:border-persian-green-800 dark:bg-persian-green-950 dark:text-persian-green-100 dark:focus:ring-persian-green-600 w-full rounded-xl border bg-white p-3 text-sm text-gray-800 shadow-sm focus:ring-1"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="text-persian-green-700 dark:text-persian-green-200 mb-1 block text-sm font-semibold">
            Category
          </label>
          <select
            {...register("category")}
            className="border-persian-green-300 dark:border-persian-green-800 dark:bg-persian-green-950 dark:text-persian-green-100 w-full rounded-xl border bg-white p-3 text-sm shadow-sm"
          >
            <option value="">Select Category</option>
            <option value="user">User</option>
            <option value="name">Name</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Tag */}
        <div>
          <label className="text-persian-green-700 dark:text-persian-green-200 mb-1 block text-sm font-semibold">
            Tags
          </label>

          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Type a tag and press Enter"
            className="border-persian-green-300 focus:border-persian-green-500 focus:ring-persian-green-400 dark:border-persian-green-800 dark:bg-persian-green-950 dark:text-persian-green-100 dark:focus:ring-persian-green-600 w-full rounded-xl border bg-white p-3 text-sm text-gray-800 shadow-sm focus:ring-1"
          />

          {errors.tags && (
            <p className="mt-1 text-sm text-red-500">{errors.tags.message}</p>
          )}

          {/* Display tags */}
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-persian-green-100 dark:bg-persian-green-800 text-persian-green-900 dark:text-persian-green-100 flex items-center gap-2 rounded-full px-3 py-1 text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="text-persian-green-700 dark:text-persian-green-200 mb-1 block text-sm font-semibold">
            Content
          </label>
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <MarkdownEditor value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-500">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Feature Image Upload */}
        <div>
          <label className="text-persian-green-700 dark:text-persian-green-200 mb-1 block text-sm font-semibold">
            Feature Image
          </label>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />

          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="bg-persian-green-100 text-persian-green-900 hover:bg-persian-green-200 dark:bg-persian-green-800 dark:text-persian-green-100 dark:hover:bg-persian-green-700 flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium transition disabled:opacity-60"
          >
            {isUploading ? (
              <>
                <FaSpinner className="h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Image"
            )}
          </motion.button>

          {errors.featureImage && (
            <p className="mt-1 text-sm text-red-500">
              {errors.featureImage.message}
            </p>
          )}

          {uploadedImageUrl && (
            <motion.img
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              src={uploadedImageUrl}
              alt="Uploaded Preview"
              className="border-persian-green-200 dark:border-persian-green-800 mt-4 h-40 w-auto rounded-lg border object-cover shadow-md"
            />
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          className="bg-persian-green-600 hover:bg-persian-green-700 w-full rounded-xl px-6 py-3 text-center text-sm font-semibold text-white shadow-md transition"
        >
          {isSubmitting ? "Submitting..." : "Submit Blog"}
        </motion.button>

        {errors && console.log(errors)}
      </form>
    </div>
     )}
            </Popup>
  );
}
