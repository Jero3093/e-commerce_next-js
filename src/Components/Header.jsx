import React from "react";
import Image from "next/image";
import Icon from "../Icons/Icon.png";
import MenuIcon from "../Icons/Menu.png";
import UserIcon from "../Icons/user.png";
import UserConfigIcon from "../Icons/user_config.png";
import { useDispatch } from "react-redux";
import { MenuSlice } from "@/app/Redux/MenuSlice";
import Link from "next/link";

function Header({ User }) {
  const Dispatch = useDispatch(); //Dispatch Hook

  return (
    <div className="flex flex-row justify-between p-2 px-3 items-center">
      {/* Menu Button */}
      <div
        onClick={() => Dispatch(MenuSlice.actions.SetMenu(true))}
        className="cursor-pointer hover:animate-pulse lg:hidden"
      >
        <Image src={MenuIcon} className="w-11" alt="Logo" />
      </div>
      {/* Logo */}
      <div className="flex flex-row items-center gap-x-3">
        <Image src={Icon} className="w-14 h-14 drop-shadow-md" />
        <p className="font-bold text-2xl hidden md:flex">E-Commerce</p>
      </div>
      {/* Menu Links */}
      <div className="flex-row items-center gap-x-4 mt-4 hidden lg:flex">
        <Link
          href="./"
          className="text-xl font-bold hover:text-2xl hover:border-b-2 border-black"
          onClick={() => Dispatch(MenuSlice.actions.SetMenu(false))}
        >
          Home
        </Link>
        <Link
          href={"./contact"}
          className="text-xl font-bold hover:text-2xl hover:border-b-2 border-black"
          onClick={() => Dispatch(MenuSlice.actions.SetMenu(false))}
        >
          Contact
        </Link>
        <Link
          href={"#"}
          className="text-xl font-bold hover:text-2xl hover:border-b-2 border-black"
          onClick={() => Dispatch(MenuSlice.actions.SetMenu(false))}
        >
          My Cart
        </Link>
      </div>
      {/* User Button */}
      {User ? (
        <Link href={"/user"}>
          <Image src={UserConfigIcon} alt="user" width={47} height={47} />
        </Link>
      ) : (
        <Link href={"/login"}>
          <Image src={UserIcon} width={47} height={47} alt="user" />
        </Link>
      )}
    </div>
  );
}

export default Header;
