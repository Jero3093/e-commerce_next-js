"use client";
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  IoLogoWhatsapp,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoGithub,
} from "react-icons/io5";
import { motion } from "framer-motion";
import Header from "@/Components/Header"; //Header Component
import Menu from "@/Components/Menu"; //Menu Component
import Footer from "@/Components/Footer";

export default function Contact() {
  const MenuOpen = useSelector((state) => state.MenuSlice.Open);

  return (
    <div className="flex min-h-screen flex-col bg-sky-950 lg:pl-36 lg:pr-36">
      {MenuOpen ? (
        <Menu />
      ) : (
        <>
          {/* Header */}
          <Header />
          {/* Contacts */}
          <div className="flex flex-col gap-y-3 self-center mt-5">
            {/* Whatsapp */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href={"#"}
                className="flex flex-row gap-x-3 items-center p-2"
                target="_blank"
              >
                <IoLogoWhatsapp className="w-16 h-16 text-emerald-500" />
                <p className="text-2xl text-white hover:text-emerald-500">
                  Whatsapp
                </p>
              </Link>
            </motion.div>
            {/* Instagram */}
            <motion.div
              initial={{ x: 150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href={"https://www.instagram.com/jero_tornini_/"}
                className="flex flex-row gap-x-3 items-center p-2"
                target="_blank"
              >
                <IoLogoInstagram className="w-16 h-16 text-pink-600" />
                <p className="text-2xl text-white hover:text-pink-600">
                  Instagram
                </p>
              </Link>
            </motion.div>
            {/* Linkedin */}
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href={"https://www.linkedin.com/in/jeronimo-tornini-39ab1923b/"}
                className="flex flex-row gap-x-3 items-center p-2"
                target="_blank"
              >
                <IoLogoLinkedin className="w-16 h-16 text-blue-500" />
                <p className="text-2xl text-white hover:text-blue-500">
                  LinkedIn
                </p>
              </Link>
            </motion.div>
            {/* Github */}
            <motion.div
              initial={{ x: 250, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href={"https://github.com/Jero3093"}
                className="flex flex-row gap-x-3 items-center p-2"
                target="_blank"
              >
                <IoLogoGithub className="w-16 h-16 text-white" />
                <p className="text-2xl text-white">GitHub</p>
              </Link>
            </motion.div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}
