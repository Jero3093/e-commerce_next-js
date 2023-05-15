import React from "react";
import Image from "next/image";
import Icon from "../Icons/Icon.png";
import MenuIcon from "../Icons/Menu.png";
import { useDispatch } from "react-redux";
import { MenuSlice } from "@/app/Redux/MenuSlice";

function Header() {
  const Dispatch = useDispatch(); //Dispatch Hook

  return (
    <div className="flex flex-row justify-between p-2 px-3 items-center">
      {/* Logo */}
      <div className="flex flex-row items-center gap-x-3">
        <Image src={Icon} className="w-14 h-14 drop-shadow-md" />
        <p className="font-bold text-2xl">E-Commerce</p>  
      </div>
      {/* Menu */}
      <div
        onClick={() => Dispatch(MenuSlice.actions.SetMenu(true))}
        className="cursor-pointer hover:animate-pulse"
      >
        <Image src={MenuIcon} className="w-11" />
      </div>
    </div>
  );
}

export default Header;
