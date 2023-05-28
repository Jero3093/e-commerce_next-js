"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Toaster, toast } from "sonner";
import { auth } from "@/firebase/Firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { UserSlice } from "../Redux/UserSlice";
import Menu from "@/Components/Menu";
import Header from "@/Components/Header";

function User() {
  const MenuOpen = useSelector((state) => state.MenuSlice.Open); //Menu Current State

  const CurrentUser = useSelector((state) => state.UserSlice.User); //Current User State

  const Dispatch = useDispatch();

  const Router = useRouter();

  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  const HandleLogOut = async () => {
    try {
      await signOut(auth)
        .then(() => {
          toast.promise(promise, {
            loading: "Loading...",
            success: () => {
              return `You logged out successfully`;
            },
            error: "Error",
          });
          localStorage.removeItem("userSession");
          Dispatch(UserSlice.actions.LogOutUser());
        })
        .finally(() => {
          Router.replace("/");
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="flex flex-col lg:pl-36 lg:pr-36 min-h-screen bg-sky-950">
      {MenuOpen ? (
        <Menu />
      ) : (
        <>
          <Toaster richColors position="top-center" />
          {/* Header */}
          <Header User={CurrentUser} />
          {/* User Info */}
          <div className="flex flex-col p-3 h-96 mt-3 md:self-center md:border-l-2 md:border-sky-900/20 md:border-r-2 md:pl-10 md:pr-10 lg:pl-32 lg:pr-32">
            {/* Title */}
            <p className="text-2xl text-white font-semibold">
              User Information:
            </p>
            {/* Info Container */}
            <div className="pl-4 pt-4">
              {/* Email */}
              <p className="text-xl text-white">Email: jero@gmail.com</p>
            </div>
            <button
              className="w-80 h-12 bg-rose-500 self-center rounded-full text-2xl font-semibold mt-auto"
              onClick={HandleLogOut}
            >
              Log Out
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default User;
