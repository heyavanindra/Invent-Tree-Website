"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Loading from "../../../components/loading";
import EditProject from "../projects/EditProject";
import CreateBlogPage from "../admin/editor/page"; // Assuming this is the component for creating a blog post
import Footer from "../../../components/Footer"; // Importing Footer component
import { useSession } from "next-auth/react";

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.4,
            type: "spring",
        },
    }),
};

const Page = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const session = useSession();

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.get("/api/blog");
                setData(response.data.message);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getUserData();
    }, []);

    const handleDeleteBlog = async (id) => {
        try {
            const response = await fetch(`/api/blog?id=${id}`, {
                method: "DELETE",
            });
            if (response.status === 200) {
                alert("Blog deleted successfully");
                setData(data.filter(item => item._id !== id)); // Update state without reloading
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center text-xl">
                <Loading />
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen max-md:mt-20 bg-gray-50 px-4 py-10 dark:bg-gray-900  dark:text-neutral-300">
                <div>
                    <h1 className="mb-10 text-center text-4xl font-bold text-[#08807a]">Blog Articles</h1>
                    <div className="w-full flex justify-end">
                        {session?.status === "authenticated" && (
                            <div className="w-2/4 ms-5 flex justify-center">
                                <CreateBlogPage />
                            </div>
                        )}
                    </div>
                </div>
                <div className="mx-auto max-w-4xl space-y-6">
                    {data.map((item, i) => (
                        <motion.div
                            key={item._id}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            className="flex flex-col gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-lg transition-all duration-100 ease-in-out hover:shadow-xl hover:scale-105 md:flex-row"
                        >
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={item.title || "Blog Image"}
                                    className="h-40 w-full rounded-xl object-cover md:w-52"
                                />
                            )}
                            <div className="flex flex-1 flex-col justify-between">
                                <div>
                                    <h2 className="line-clamp-2 text-xl font-semibold text-gray-800 md:text-2xl">
                                        {item.title || item.slug}
                                    </h2>
                                    <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                                        {item.excerpt?.plainText || item.content || "No description available."}
                                    </p>
                                </div>
                                <div className="mt-4 text-sm text-gray-500">
                                    Category:{" "}
                                    <span className="font-medium">
                                        {item.category || "Uncategorized"}
                                    </span>
                                </div>
                            </div>
                            {session?.status === "authenticated" && (
                                <div className="flex h-12 gap-2">
                                    <EditProject />
                                    <button
                                        type="button"
                                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                        onClick={() => handleDeleteBlog(item._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Page;
