import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { MenuSlice } from "@/app/Redux/MenuSlice";
import { IoCloseOutline } from "react-icons/io5";

function Menu() {
  const Dispatch = useDispatch();

  return (
    <div className="flex flex-col h-screen items-center">
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
        <Link
          href={"#"}
          className="text-xl font-bold text-white"
          onClick={() => Dispatch(MenuSlice.actions.SetMenu(false))}
        >
          My Cart
        </Link>
      </div>
    </div>
  );
}

export default Menu;
