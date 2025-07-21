'use client'; // If you're using Next.js App Router

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const images = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s',
  'https://thumbs.dreamstime.com/b/innovative-medical-device-featuring-eye-image-illustrating-advanced-tracking-technology-generated-ai-358374352.jpg',
  'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPIfiGgUML8G3ZqsNLHfaCnZK3I5g4tJabQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUsbmTZu_uMrmJ0z--CrG-o1UIXytu1OCizQ&s',
  'https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbnUheL6Gz4BOy-uR6-BZ8KFIYVVDn-18ciQ&s',
];


const Page = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto overflow-y-auto w-screen h-screen 
                   snap-y snap-mandatory flex flex-col 
                   md:snap-x md:flex-row md:overflow-y-hidden md:overflow-x-auto"
      >

        {/* Slides Wrapper */}
        <div className="flex flex-col md:flex-row w-screen h-[400vh] md:w-[400vw] md:h-screen">

          {/* Slide 1 */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dpbpu5b0v/image/upload/v1752593870/Screenshot_2025-07-15_210659_xpsbuf.png')",
            }}
            className="w-screen h-screen flex max-md:flex-col items-center justify-center bg-cover bg-center bg-slate-200 min-md:gap-20 snap-start"
          >
            <div className="flex flex-col items-center gap-5 min-md:h-1/2">
              <h1 className="text-5xl text-[#20998e] max-md:text-center max-md:mt-10">Political Consultancy Services</h1>
              <p className="text-[#20998e] border-t w-[120px] text-center">Message</p>
            </div>
            <div className="max-w-xl">
              <p className="pb-10 max-md:px-5 max-md:text-center text-sm text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, libero saepe doloribus,
                nemo esse omnis quo ad aliquam enim culpa ex voluptas officiis accusamus laudantium
                veritatis quae excepturi magnam repudiandae.
                <br />
                <br />
                Atque soluta modi facilis hic vitae, est tempora nisi porro, perspiciatis, a
                voluptatibus.
                <br />
                <br />
                Quod ab aperiam, accusantium soluta totam laudantium odio exercitationem nemo non
                earum laboriosam omnis ipsa esse nostrum.
              </p>
              <div className='max-md:flex max-md:justify-center'>
                <Link href="/blog" className="rounded-md border border-slate-300 shadow-xl w-50 px-6 py-3 hover:bg-[#20998e] hover:text-white transition duration-300 dark:bg-slate-400 dark:text-white">
                  MORE
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Slide 2 */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dpbpu5b0v/image/upload/v1752595832/Screenshot_2025-07-15_213828_t4jgvw.png')",
            }}
            className="w-screen h-screen flex items-center bg-cover bg-center bg-slate-200 gap-20 snap-start"
          >
            <p className="w-1/2 text-white text-xl px-10 max-md:w-full">
              Our firm is dedicated to empowering political candidates, parties, and organizations
              with strategic, data-driven, and innovative solutions to achieve electoral success and
              effective governance. Below is a detailed catalogue of our services, each designed to
              address the multifaceted challenges of modern political campaigns.
            </p>
          </motion.div>

          {/* Slide 3 */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dpbpu5b0v/image/upload/v1752598504/Screenshot_2025-07-15_222532_ftsh87.png')",
            }}
            className="w-screen h-screen flex items-center justify-center bg-cover bg-center bg-slate-200 gap-20 snap-start"
          >
            <div className="flex flex-col items-center gap-5 w-1/2 max-md:w-full justify-center">
              <h1 className="text-5xl bg-gradient-to-b from-blue-50 to-blue-200 py-2 mx-10 max-md:text-3xl text-center">
                Website/App Development & Upkeep
              </h1>
              <ul className="text-[#20998e] w-1/2 max-md:w-full max-md:text-2xl max-md:px-5 overflow-auto text-center">
                <li>● Custom Website Design: Tailored to reflect your campaign’s branding.</li>
                <li>● Mobile App Development: Push notifications, event updates, donations.</li>
                <li>● Content Management: Easy-to-use systems for multimedia updates.</li>
              </ul>
              <Link href="/services" className="text-center rounded-md border border-slate-300 shadow-xl w-50 px-6 py-3 max-md:mt-10 hover:bg-[#20998e] dark:bg-slate-300 hover:text-white transition duration-300">
                LEARN MORE
              </Link>
            </div>
          </motion.div>

          {/* Slide 4 */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dpbpu5b0v/image/upload/v1752599877/Screenshot_2025-07-15_224833_mgl78h.png')",
            }}
            className="w-screen h-screen flex items-center justify-between bg-cover bg-center bg-slate-200 snap-start"
          >
            {/* Left Content */}
            <div className="w-full h-full flex justify-center items-center ">
              <div className="flex flex-col items-center gap-5 px-4">
                <img
                  src="https://res.cloudinary.com/dpbpu5b0v/image/upload/v1752599604/Screenshot_2025-07-15_224405_ku0qio.png"
                  alt="Campaign"
                />
                <h1 className="font-bold text-3xl text-[#20998e] text-center">
                  End-to-End Campaign Management
                </h1>
                <p className="text-2xl text-center dark:text-black">Strategic Planning</p>
              </div>
            </div>

            {/* Right Auto-Scroll Area */}
            <div className="w-1/4 h-full hidden md:flex">
              {/* Left Column Scroll */}
              <div className="w-full h-full overflow-hidden">
                <motion.div
                  className="flex flex-col"
                  animate={{ y: ["5%", "-100%"] }}
                  transition={{
                    duration: 60,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  {[...images, ...images].map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`scroll-img-left-${i}`}
                      className="w-full h-[150px] object-cover"
                    />
                  ))}
                </motion.div>
              </div>

              {/* Right Column Scroll */}
              <div className="w-full h-full overflow-hidden">
                <motion.div
                  className="flex flex-col"
                  animate={{ y: ["0%", "-100%"] }}
                  transition={{
                    duration: 60,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  {[...images, ...images].map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`scroll-img-right-${i}`}
                      className="w-full h-[150px] object-cover"
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Page;
