"use client";

import React, { useState } from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

const EditProject = ({ id, initialData }) => {
  const [titleEn, setTitleEn] = useState(initialData?.title?.en || "");
  const [titleHi, setTitleHi] = useState(initialData?.title?.hi || "");
  const [descEn, setDescEn] = useState(initialData?.description?.en || "");
  const [descHi, setDescHi] = useState(initialData?.description?.hi || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [imageFile, setImageFile] = useState(null); // for new image upload

  const handleUpdate = async (e, close) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titleEn", titleEn);
    formData.append("titleHi", titleHi);
    formData.append("descriptionEn", descEn);
    formData.append("descriptionHi", descHi);
    formData.append("category", category);
    formData.append("featured", featured);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: "PATCH",
        body: formData,
      });

      const data = await res.json();
      if (data.data) {
        alert("Project updated successfully");
        close();
        location.reload(); // reload to reflect changes
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating project");
    }
  };

  return (
    <Popup
      trigger={
        <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Edit
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
          <form onSubmit={(e) => handleUpdate(e, close)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title (English)</label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Title (Hindi)</label>
              <input
                type="text"
                value={titleHi}
                onChange={(e) => setTitleHi(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description (English)</label>
              <textarea
                value={descEn}
                onChange={(e) => setDescEn(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description (Hindi)</label>
              <textarea
                value={descHi}
                onChange={(e) => setDescHi(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Upload New Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full border px-3 py-2 rounded"
                required={!initialData?.image} // require if no initial image
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              <label>Featured</label>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={close}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </Popup>
  );
};

export default EditProject;
