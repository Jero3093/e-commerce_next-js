import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function BackButton() {
  const Router = useRouter();

  return (
    <motion.div
      className="flex flex-row items-center text-white font-semibold cursor-pointer w-24"
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      onClick={() => Router.back()}
    >
      <IoArrowBack className="w-6 h-5" /> Go Back
    </motion.div>
  );
}

export default BackButton;
