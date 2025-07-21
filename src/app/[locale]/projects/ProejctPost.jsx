import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const ProjectPost = () => {
    const [titleEn, setTitleEn] = useState('');
    const [titleHi, setTitleHi] = useState('');
    const [descEn, setDescEn] = useState('');
    const [descHi, setDescHi] = useState('');
    const [category, setCategory] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [featured, setFeatured] = useState(false);

    const handleSubmit = async (e, close) => {
        e.preventDefault();
        const formData = new FormData();

        // Flatten nested objects
        formData.append('titleEn', titleEn);
        formData.append('titleHi', titleHi);
        formData.append('descriptionEn', descEn);
        formData.append('descriptionHi', descHi);

        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const res = await fetch(`/api/projects`, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            console.log('Response:', data);

            if (data.data) {
                close();
                alert('Project posted successfully');
                location.reload();
            }
        } catch (err) {
            console.error('Error submitting project:', err);
            alert('Failed to post project');
        }
    };

    return (
        <div>
            <Popup
                trigger={
                    <span className="text-lg py-2 px-4 border-l-4 border-[#08807a] font-normal relative left-3 select-text bg-white rounded-md shadow-sm cursor-default">
                        Post a Project
                    </span>
                }
                modal
                contentStyle={{
                    width: '60%',
                    height: '80vh',
                    borderRadius: '10px',
                    padding: '20px',
                    overflow: 'auto',
                }}
            >
                {(close) => (
                    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg relative p-6">
                        <button
                            className="absolute top-2 right-3 text-2xl font-bold text-gray-700 dark:text-white"
                            onClick={close}
                        >
                            &times;
                        </button>

                        <h2 className="text-2xl mb-4 font-bold text-black dark:text-white text-center">Post a Project</h2>

                        <form onSubmit={(e) => handleSubmit(e, close)} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">Title (English)</label>
                                <input
                                    type="text"
                                    value={titleEn}
                                    onChange={(e) => setTitleEn(e.target.value)}
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">Title (Hindi)</label>
                                <input
                                    type="text"
                                    value={titleHi}
                                    onChange={(e) => setTitleHi(e.target.value)}
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">Description (English)</label>
                                <textarea
                                    value={descEn}
                                    onChange={(e) => setDescEn(e.target.value)}
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">Description (Hindi)</label>
                                <textarea
                                    value={descHi}
                                    onChange={(e) => setDescHi(e.target.value)}
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">Category</label>
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">Upload Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    className="mt-1 border border-gray-300 rounded"
                                    required
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={featured}
                                    onChange={(e) => setFeatured(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label className="text-gray-700 dark:text-white">Featured</label>
                            </div>

                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={close}
                                    className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Save Project
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </Popup>
        </div>
    );
};

export default ProjectPost;
