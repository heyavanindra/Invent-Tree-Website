"use client";

import React from "react";
import { motion } from "framer-motion";  // Importing framer-motion for animations
import { useState, useEffect } from "react";
import EditService from "./EditService";
import ServicePost from "./ServicePost"; // Importing the ServicePost component
import Footer from "../../../components/Footer";
import Loading from "../../../components/loading";
import { useSession } from "next-auth/react";

const Page = () => {
    // Animation variants
    const imageVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };
    const textVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } },
    };

    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);
    const session = useSession();

    let servicesData = async () => {
        let data = await fetch("/api/services");
        let res = await data.json();
        console.log("Services Data:", res.message);
        return res.message;  // <-- Add this line
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        servicesData().then((data) => {
            setServices(data);
            setLoading(false);  // Set loading to false after data is fetched
        });
    }, []);

    let handleDelete = async (id) => {
        let res = await fetch(`/api/services?id=${id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            setServices(services.filter((service) => service._id !== id));
            alert("Service deleted successfully");
            servicesData().then((data) => {
                setServices(data);
            });
        } else {
            alert("Failed to delete service");
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
            <div className="min-h-screen bg-[#f3f7ff]  dark:bg-gray-900 pb-10 text-gray-900 font-sans ">
                {/* Header Section */}
                <motion.header
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative bg-slate-200 bg-top bg-no-repeat bg-contain"
                >
                    <div
                        className="min-h-[50vh] bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('https://res.cloudinary.com/dpbpu5b0v/image/upload/v1753085021/Screenshot_2025-07-21_133220_ywyg2s.png')",
                        }}
                    ></div>
                    <div className="max-w-7xl mx-auto px-6 -mt-29 pb-30 flex justify-end pe-50 text-[#08807a] font-bold select-none">
                        <div className="flex items-center gap-4 flex-col absolute  z-50">
                            <span className="text-lg py-2 px-4 border-l-4 border-[#08807a] font-normal relative left-3 select-text bg-white rounded-md shadow-sm cursor-default">
                                Home Services
                            </span>
                            {session?.status === "authenticated" && <ServicePost />}
                        </div>
                    </div>
                </motion.header>

                {/* Services Section */}
                {services && services.map((service, index) => (
                    <motion.section
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`max-w-7xl  mx-auto px-6 py-10 bg-white rounded-xl shadow-md ${index === 0 ? "-mt-12 relative z-10" : "mt-10"}`}
                    >
                        <div className="flex justify-between items-center mb-6 max-md:flex-col max-md:gap-5">
                            <h2 className="flex items-start text-4xl text-[#08807a] font-light">
                                <span className="border-l-4 border-[#08807a] pl-2">Service {index + 1}</span>
                                <span className="ml-4 text-lg font-normal">{service.title.en}</span>
                                <span className="inline-block ml-2 text-sm text-[#08807a]">»</span>
                            </h2>
                            {session?.status === "authenticated" && (
                                <div className="flex justify-center max-md:justify-end gap-2 item-center max-md:w-full max-md:pe-5">
                                    <EditService id={service._id} initialData={service} />
                                    <button
                                        type="button"
                                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                        onClick={() => handleDelete(service._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col md:flex-row mt-8 gap-8">
                            <motion.img
                                src={service.image}
                                alt={service.title.en}
                                className="rounded-lg shadow-lg w-full md:w-1/2 h-auto object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/600x300?text=Image+Not+Available";
                                }}
                                variants={imageVariants}
                                initial="hidden"
                                animate="visible"
                            />
                            <motion.div
                                className="flex-1 text-gray-700"
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <p className="mb-3 text-xl font-semibold text-indigo-600">{service.description.en}</p>
                                {service.category && (
                                    <p className="mb-2 text-sm text-gray-500">Category: {service.category}</p>
                                )}
                            </motion.div>
                        </div>
                    </motion.section>
                ))}

                {/* PE and PP Difference Table Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-7xl mx-auto px-6 py-10 rounded-xl bg-[#f0f4ff] text-gray-700 mt-10 shadow-lg"
                >
                    <h3 className="text-center mb-6 font-semibold text-2xl text-[#08807a]">Our Core Service Comparison</h3>
                    <div className="overflow-auto">
                        <table className="w-full table-fixed border-collapse border border-gray-300">
                            <thead className="bg-[#08807a] text-white text-center">
                                <tr>
                                    <th className="w-1/4 border border-gray-300 py-4">Service</th>
                                    <th className="border border-gray-300 py-4">Political Consulting</th>
                                    <th className="border border-gray-300 py-4">Geospatial Analysis</th>
                                    <th className="border border-gray-300 py-4">Survey Research</th>
                                </tr>
                            </thead>
                            <tbody className="text-center text-gray-800">
                                <tr>
                                    <td className="border border-gray-300 bg-[#08807a] text-white font-semibold py-3">Focus Areas</td>
                                    <td className="border border-gray-300 py-3">Campaign strategy, voter profiling, media management</td>
                                    <td className="border border-gray-300 py-3">GIS mapping, satellite data, location intelligence</td>
                                    <td className="border border-gray-300 py-3">Public opinion surveys, exit polls, demographic insights</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 bg-[#08807a] text-white font-semibold py-3">Key Tools</td>
                                    <td className="border border-gray-300 py-3">CRM, analytics dashboards</td>
                                    <td className="border border-gray-300 py-3">QGIS, Google Earth Engine</td>
                                    <td className="border border-gray-300 py-3">Custom forms, mobile data collection apps</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 bg-[#08807a] text-white font-semibold py-3">Client Impact</td>
                                    <td className="border border-gray-300 py-3">Increased vote share, targeted outreach</td>
                                    <td className="border border-gray-300 py-3">Improved planning, real-time insights</td>
                                    <td className="border border-gray-300 py-3">Accurate feedback, data-driven decisions</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </motion.section>
            </div>
            <Footer />
        </>
    );
};

export default Page;
