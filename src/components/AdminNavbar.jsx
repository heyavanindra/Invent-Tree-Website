"use client";
import cn from "../utils/cn";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SlArrowRight } from "react-icons/sl";
import Link from "next/link";
import { MenuButton } from "./menuButton";
import { ModeToggle } from "../components/toggle-button";
import { signOut, useSession } from "next-auth/react";
const AdminNavitems = [
  { title: "Home", href: "/" },
  { title: "About", href: "/" },
  { title: "Services", href: "/service" },
  { title: "Case Study", href: "/" },
  { title: "Projects", href: "/projects" },
  { title: "Blog", href: "/blog" },
  { title: "Admin Dashboard", href: "/admin/dashboard" },
];

const AdminNavbar = ({ className }) => {
  const [open, setOpen] = useState(false);
  const session = useSession();
  console.log(session);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-60 flex h-24 w-full  items-center justify-between px-4 md:px-6",
        className,
      )}
    >
      <img
        src="https://www.yuitech.jp/wp/wp-content/themes/standard_sass/images/common/logo-bg.svg"
        className="absolute top-0 left-0"
        alt=""
      />
      <Link href={"/"} className="z-10 flex  ">
        <img src="https://res.cloudinary.com/dpbpu5b0v/image/upload/v1753074925/ogp-removebg-preview_ghmjsh.png" alt="" className="w-50 h-35" />
      </Link>

      <div className="z-50 flex cursor-pointer items-center justify-center gap-x-3 p-2 text-2xl text-black dark:text-white">
        <ModeToggle className={""} />
        <MenuButton
          isOpen={open}
          onClick={() => setOpen(!open)}
          strokeWidth="4"
          color="#3399cc"
          transition={{ ease: "easeOut", duration: 0.2 }}
          width="64"
          height="24"
          className="h-[24] max-sm:w-[34]"
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="bg-persian-green-100 dark:bg-persian-green-950  absolute top-0 left-0 flex h-screen w-full flex-col items-start justify-center text-black dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-28 flex w-screen flex-col items-center justify-center px-4 md:mx-auto md:max-w-7xl">
              <div className="flex  dark:bg-persian-green-950 dark:text-white">
                <img
                  src="https://res.cloudinary.com/dpbpu5b0v/image/upload/v1753074925/ogp-removebg-preview_ghmjsh.png"
                  alt=""
                  className="h-40 w-70"
                />
              </div>

              <div className="mt-12 flex w-full flex-col items-start justify-center gap-y-3 p-4 md:flex-row md:items-center md:justify-center md:gap-x-6">
                {AdminNavitems.map((item) => (
                  <Link
                    href={item.href}
                    key={item.title}
                    onClick={() => setOpen(false)}
                    className="hover:text-persian-green-600 flex w-full cursor-pointer items-center justify-between p-2 text-2xl font-semibold text-neutral-700 transition-all duration-200 hover:scale-105 md:w-auto md:justify-center md:text-xl dark:text-neutral-100"
                  >
                    {item.title}
                    <SlArrowRight className="ml-2 inline md:hidden" />
                  </Link>
                ))}
              </div>
              {/* */}
              <div className="mt-8 flex flex-col items-center justify-center gap-y-6 px-4 md:mt-10 md:flex-row md:gap-x-20">
                {session.status === "authenticated" ? (
                  <button
                    className="bg-persian-green-200 dark:bg-persian-green-800 dark:hover:bg-persian-green-900 hover:bg-persian-green-300 cursor-pointer rounded-full px-6 py-2 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 dark:text-white"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Log out
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-x-4  ">
                    <Link href={"/admin/signup"}
                      className="bg-persian-green-200 dark:bg-persian-green-800 dark:hover:bg-persian-green-900 hover:bg-persian-green-300 cursor-pointer rounded-full px-6 py-2 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 dark:text-white"
                    >
                      Signup
                    </Link>
                    <Link href={"/admin/login"}
                      onClick={() => setOpen(false)}
                      className="bg-persian-green-200 dark:bg-persian-green-800 dark:hover:bg-persian-green-900 hover:bg-persian-green-300 cursor-pointer rounded-full px-6 py-2 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 dark:text-white"
                    >
                      Login
                    </Link>
                  </div>

                )}
              </div>

              <div className="mt-6 w-full p-2 text-center text-sm font-semibold text-neutral-700 dark:text-neutral-400">
                ©2024 Yuitech
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminNavbar;
