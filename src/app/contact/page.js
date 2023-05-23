"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import WhatsappIcon from "../../Icons/whatsapp.png";
import GithubIcon from "../../Icons/github.png";
import LinkedinIcon from "../../Icons/linkedin.png";
import InstagramIcon from "../../Icons/instagram.png";
import Header from "@/Components/Header"; //Header Component
import Menu from "@/Components/Menu";

export default function page() {
  const MenuOpen = useSelector((state) => state.MenuSlice.Open);

  return (
    <div className="flex h-full min-h-screen flex-col">
      {MenuOpen ? (
        <Menu />
      ) : (
        <>
          {/* Header */}
          <Header />
          {/* Contacts */}
          <div className="flex flex-col gap-y-3 items-center">
            {/* Whatsapp */}
            <Link href={"#"} className="flex flex-row gap-x-3 items-center p-2">    
              <Image src={WhatsappIcon} width={50} height={50} />
              <p className="text-lg">Whatsapp</p>
            </Link>
            {/* Instagram */}
            <Link href={"#"} className="flex flex-row gap-x-3 items-center p-2">
              <Image src={InstagramIcon} width={55} height={55} />
              <p className="text-lg">Instagram</p>
            </Link>
            {/* Linkedin */}
            <Link href={"#"} className="flex flex-row gap-x-3 items-center p-2">
              <Image src={LinkedinIcon} width={50} height={50} />
              <p className="text-lg">LinkedIn</p>
            </Link>
            {/* Github */}
            <Link href={"#"} className="flex flex-row gap-x-3 items-center p-2">
              <Image src={GithubIcon} width={50} height={50} />
              <p className="text-lg">GitHub</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
