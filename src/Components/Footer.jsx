import React from "react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.div
      className="flex flex-col gap-y-2 items-center mt-auto mb-2"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <p className="text-lg text-zinc-600">E-Commerce</p>
      <p className="text-zinc-600">Copyright© 2023</p>
    </motion.div>
  );
}

export default Footer;
