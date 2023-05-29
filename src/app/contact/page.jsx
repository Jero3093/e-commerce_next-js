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
import Header from "@/Components/Header"; //Header Component
import Menu from "@/Components/Menu"; //Menu Component

export default function Contact() {
  const MenuOpen = useSelector((state) => state.MenuSlice.Open);

  const CurrentUser = useSelector((state) => state.UserSlice.User);

  return (
    <div className="flex min-h-screen flex-col bg-sky-950 lg:pl-36 lg:pr-36">
      {MenuOpen ? (
        <Menu />
      ) : (
        <>
          {/* Header */}
          <Header User={CurrentUser} />
          {/* Contacts */}
          <div className="flex flex-col gap-y-3 self-center mt-5">
            {/* Whatsapp */}
            <Link href={"#"} className="flex flex-row gap-x-3 items-center p-2">
              <IoLogoWhatsapp className="w-16 h-16 text-emerald-500" />
              <p className="text-2xl text-white hover:text-emerald-500">
                Whatsapp
              </p>
            </Link>
            {/* Instagram */}
            <Link href={"#"} className="flex flex-row gap-x-3 items-center p-2">
              <IoLogoInstagram className="w-16 h-16 text-pink-600" />
              <p className="text-2xl text-white hover:text-pink-600">
                Instagram
              </p>
            </Link>
            {/* Linkedin */}
            <Link href={"#"} className="flex flex-row gap-x-3 items-center p-2">
              <IoLogoLinkedin className="w-16 h-16 text-blue-500" />
              <p className="text-2xl text-white hover:text-blue-500">
                LinkedIn
              </p>
            </Link>
            {/* Github */}
            <Link href={"#"} className="flex flex-row gap-x-3 items-center p-2">
              <IoLogoGithub className="w-16 h-16 text-white" />
              <p className="text-2xl text-white">GitHub</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
