"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; //Redux
import { Toaster, toast } from "sonner"; //Notifications
import { auth } from "@/firebase/Firebase"; //Firebase Auth
import { signOut } from "firebase/auth"; //Firebase Sign Out
import { useRouter } from "next/navigation"; //Navigation Router
import { UserSlice } from "../Redux/UserSlice"; //User Slice
import { database } from "@/firebase/Firebase"; //Firestore Database
import { getDocs, collection, query, where } from "firebase/firestore"; //Firestore Functions
import { Audio } from "react-loader-spinner"; //Loader
import Menu from "@/Components/Menu"; //Menu Component
import Header from "@/Components/Header"; //Header Component

function User() {
  useEffect(() => {
    GetUserData();
  }, []);

  const [IsLoading, setIsLoading] = useState(false); //Loading State

  const [UserData, setUserData] = useState([]); //User Data from Database

  const GetUserData = async () => {
    try {
      setIsLoading(true);
      await getDocs(
        query(
          collection(database, "users"),
          where("userId", "==", CurrentUser.userId)
        )
      )
        .then((user) => {
          user.forEach((user) => {
            setUserData(user.data());
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }; //Get Current User Data from the database

  const MenuOpen = useSelector((state) => state.MenuSlice.Open); //Menu Current State

  const CurrentUser = useSelector((state) => state.UserSlice.User); //Current User Session State

  const Dispatch = useDispatch(); //Dispatch Hook

  const Router = useRouter(); //Router Hook

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
          {IsLoading ? (
            <div className="flex items-center justify-center mt-96">
              <Audio
                height="80"
                width="80"
                radius="9"
                color="white"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
            </div>
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
                <div className="flex flex-col pl-4 pt-4 gap-y-6">
                  {/* Username */}
                  <p className="text-xl text-white">
                    Username: {UserData.username}
                  </p>
                  {/* Email */}
                  <p className="text-xl text-white">
                    Email: {UserData.userEmail}
                  </p>
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
        </>
      )}
    </main>
  );
}

export default User;
