import React from "react";
import { IoChevronForward } from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";

function AdminOptionCard({ name, href, Soon }) {
  return (
    <motion.div
      className={
        Soon
          ? "w-full h-20 flex flex-row justify-between shadow-sm items-center rounded-lg shadow-zinc-700 hover:-scale-105 cursor-not-allowed"
          : "w-full h-20 flex flex-row justify-between shadow-sm items-center rounded-lg shadow-zinc-700 cursor-pointer hover:-scale-105"
      }
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {Soon ? (
        <>
          <p className="text-white font-medium text-xl ml-2">{name}</p>
          {Soon ? (
            <span className="text-zinc-400 text-lg font-medium mr-2">
              Comming Soon
            </span>
          ) : (
            <IoChevronForward className="text-white w-6 h-6 mr-2" />
          )}
        </>
      ) : (
        <Link
          href={`${href}`}
          className="flex flex-row justify-between items-center w-full"
        >
          <p className="text-white font-medium text-xl ml-2">{name}</p>
          <IoChevronForward className="text-white w-6 h-6 mr-2" />
        </Link>
      )}
    </motion.div>
  );
}

export default AdminOptionCard;
