import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { MenuSlice } from "@/app/Redux/MenuSlice";
import { IoCloseOutline } from "react-icons/io5";
import { CartItemsCount } from "@/app/Redux/CartSlice";
import { motion } from "framer-motion";
import Footer from "./Footer";

function Menu() {
  const Dispatch = useDispatch();

  const CurrentUser = useSelector((state) => state.UserSlice.User); //Current User State

  const CartCount = useSelector(CartItemsCount);

  return (
    <motion.div
      className="flex flex-col h-screen items-center"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header */}
      <button
        className="mr-auto p-2"
        onClick={() => Dispatch(MenuSlice.actions.SetMenu(false))}
      >
        <IoCloseOutline className="w-14 h-14 text-zinc-400" />
      </button>
      <div className="flex flex-col items-center gap-y-4 mt-4">
        <Link
          href="./"
          className="text-xl font-bold text-white"
          onClick={() => Dispatch(MenuSlice.actions.SetMenu(false))}
        >
          Home
        </Link>
        <Link
          href={"./contact"}
          className="text-xl font-bold text-white"
          onClick={() => Dispatch(MenuSlice.actions.SetMenu(false))}
        >
          Contact
        </Link>
        {CurrentUser ? (
          <Link
            href={"/cart"}
            className="text-xl font-bold hover:text-2xl hover:border-b-2 border-white text-white relative"
            onClick={() => Dispatch(MenuSlice.actions.SetMenu(false))}
          >
            My Cart
            {CartCount > 0 ? (
              <p className="text-rose-500 rounded-full absolute bottom-3 -right-3">
                {CartCount}
              </p>
            ) : (
              ""
            )}
          </Link>
        ) : (
          ""
        )}
      </div>
      <Footer />
    </motion.div>
  );
}

export default Menu;
