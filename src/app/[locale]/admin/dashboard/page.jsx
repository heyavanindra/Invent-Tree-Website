"use client";
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import { fetchServices, fetchProjects, fetchBlogs } from '../../../../lib/api'; // Adjust the import path as necessary
const Page = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch data for services, projects, and blogs
    const fetchData = async () => {
      const servicesData = await fetchServices();
      const projectsData = await fetchProjects();
      const blogsData = await fetchBlogs();

      setServices(servicesData);
      setProjects(projectsData);
      setBlogs(blogsData);
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}

        {/* Dashboard Content */}
        <main className="p-4 sm:p-6">
          {activeTab === 'dashboard' && (
            <div className='space-y-6 px-10  h-[90vh] flex flex-col justify-center '>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-5 mt-10 sm:grid-cols-2 lg:grid-cols-4 ">
                  <div className="p-5 bg-white rounded-lg shadow">
                    <p className="text-sm font-medium text-gray-500 truncate">Total Services</p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">{services?.message?.length || 0}</p>
                  </div>
                  <div className="p-5 bg-white rounded-lg shadow">
                    <p className="text-sm font-medium text-gray-500 truncate">Active Projects</p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">{projects?.message?.length || 0}</p>
                  </div>
                  <div className="p-5 bg-white rounded-lg shadow">
                    <p className="text-sm font-medium text-gray-500 truncate">Total Blogs</p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">{blogs?.message?.length || 0}</p>
                  </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-6 bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Create Something</h2>
                </div>
                <ul className="divide-y divide-gray-200">
                  <li className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-indigo-600">Create a New Blog Post</p>
                      </div>
                      <Link href={"/"} className="text-sm text-gray-500  hover:bg-slate-300 px-4 py-2 rounded-xl">Add</Link>
                    </div>
                  </li>
                  <li className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-indigo-600">Add a New Project</p>
                      </div>
                      <Link href={"/"} className="text-sm text-gray-500 hover:bg-slate-300 px-4 py-2 rounded-xl">Add</Link>
                    </div>
                  </li>
                  <li className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-indigo-600">Add a New Service</p>
                      </div>
                      <Link href={"/"} className="text-sm text-gray-500  hover:bg-slate-300 px-4 py-2 rounded-xl">Add</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Page;
