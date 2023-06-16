import React, { useEffect } from "react";
import Image from "next/image";
import Icon from "../Icons/Icon.png";
import {
  IoPersonCircleOutline,
  IoSettingsSharp,
  IoMenuOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { MenuSlice } from "@/app/Redux/MenuSlice";
import { UserSlice } from "@/app/Redux/UserSlice";
import { CartItemsCount } from "@/app/Redux/CartSlice";
import { motion } from "framer-motion";
import Link from "next/link";

function Header() {
  useEffect(() => {
    GetUserSession();
  }, []);

  const GetUserSession = () => {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    if (userSession) {
      Dispatch(
        UserSlice.actions.SetUser({
          userId: userSession.userId,
          userEmail: userSession.userEmail,
          admin: userSession.admin,
        })
      );
    }
  }; //Get the Current User Session from the Local Storage

  const CurrentUser = useSelector((state) => state.UserSlice.User); //Current User State

  const CartCount = useSelector(CartItemsCount);

  const Dispatch = useDispatch(); //Dispatch Hook

  return (
    <div className="flex flex-row justify-between p-2 px-3 items-center">
      {/* Menu Button */}
      <motion.div
        initial={{ x: -3, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => Dispatch(MenuSlice.actions.SetMenu(true))}
        className="cursor-pointer hover:animate-pulse lg:hidden"
      >
        <IoMenuOutline className="w-14 h-14 text-zinc-300" />
      </motion.div>
      {/* Logo */}
      <motion.div
        className="flex flex-row items-center gap-x-3"
        initial={{ y: -3, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Image src={Icon} className="w-14 h-14 drop-shadow-md" alt="Logo" />
        <p className="font-bold text-2xl hidden md:flex text-white">
          E-Commerce
        </p>
      </motion.div>
      {/* Menu Links */}
      <div className="flex-row items-center gap-x-4 mt-4 hidden lg:flex">
        {/* Home */}
        <motion.div
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href={"/"}
            className="text-xl font-bold hover:text-2xl hover:border-b-2 border-white text-white"
          >
            Home
          </Link>
        </motion.div>
        {/* Contact */}
        <motion.div
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href={"/contact"}
            className="text-xl font-bold hover:text-2xl hover:border-b-2 border-white text-white "
          >
            Contact
          </Link>
        </motion.div>
        {/* Cart */}
        {CurrentUser ? (
          <motion.div
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href={"/cart"}
              className="text-xl font-bold hover:text-2xl hover:border-b-2 border-white text-white relative"
            >
              My Cart
              {CartCount > 0 ? (
                <p className="text-rose-500 rounded-full absolute bottom-5 -right-3">
                  {CartCount}
                </p>
              ) : (
                ""
              )}
            </Link>
          </motion.div>
        ) : (
          ""
        )}
      </div>
      {/* User Button */}
      {CurrentUser ? (
        <motion.div
          initial={{ x: 3, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link href={"/user"}>
            <IoSettingsSharp className="w-10 h-10 text-zinc-300" />
            {/* <Image src={UserConfigIcon} alt="user" width={47} height={47} /> */}
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ x: 3, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link href={"/login"}>
            <IoPersonCircleOutline className="w-12 h-12 text-zinc-300" />
            {/* <Image src={UserIcon} width={47} height={47} alt="user" /> */}
          </Link>
        </motion.div>
      )}
    </div>
  );
}

export default Header;
