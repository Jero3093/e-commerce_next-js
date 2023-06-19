"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoPencilSharp } from "react-icons/io5"; //Icons
import { useSelector, useDispatch } from "react-redux"; //Redux
import { Toaster, toast } from "sonner"; //Notifications
import { auth, UploadProfileImage, storage } from "@/firebase/Firebase"; //Firebase
import { signOut } from "firebase/auth"; //Firebase Sign Out
import { useRouter } from "next/navigation"; //Navigation Router
import { UserSlice } from "../Redux/UserSlice"; //User Slice
import { database } from "@/firebase/Firebase"; //Firestore Database
import { getDocs, collection, query, where } from "firebase/firestore"; //Firestore Functions
import { ref, getDownloadURL } from "firebase/storage"; //Firebase Storage
import { Audio } from "react-loader-spinner"; //Loader
import { motion } from "framer-motion"; //Framer Motion
import Menu from "@/Components/Menu"; //Menu Component
import Header from "@/Components/Header"; //Header Component

function User() {
  useEffect(() => {
    GetUserData();
    GetUserImage();
  }, []);

  const [IsLoading, setIsLoading] = useState(false); //Loading State

  const [UserData, setUserData] = useState([]); //User Data from Database

  const [UserImage, setUserImage] = useState(null); //User Image State

  const GetUserImage = async () => {
    //Current User Logged Id
    const CurrentUserUID = CurrentUser.userId;

    try {
      Dispatch(UserSlice.actions.ClearUserImage());
      setIsLoading(true);
      //Reference to the Firebase User Image Storage and a unique id generated
      await getDownloadURL(ref(storage, `userImg/${CurrentUserUID}`))
        .then((url) => {
          Dispatch(UserSlice.actions.SetUserImage(url));
          setUserImage(url);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  }; //Get the URL of the Uploaded Image with the same Id as the Current User

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

  const MenuOpen = useSelector((state) => state.MenuSlice.Open); //Menu Current State

  const CurrentUser = useSelector((state) => state.UserSlice.User); //Current User Session State

  const UserImgURL = useSelector((state) => state.UserSlice.UserImage); //Current User Image State

  const Dispatch = useDispatch(); //Dispatch Hook

  const Router = useRouter(); //Router Hook

  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <main className="flex flex-col lg:pl-36 lg:pr-36 min-h-screen bg-sky-950">
      {MenuOpen ? (
        <Menu />
      ) : (
        <>
          <Toaster richColors position="top-center" />
          {/* Header */}
          <Header User={CurrentUser} />
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
              {/* User Info */}
              <div className="flex flex-col p-3 h-96 mt-3 md:self-center md:border-l-2 md:border-sky-900/20 md:border-r-2 md:pl-10 md:pr-10 lg:pl-32 lg:pr-32">
                {/* User Image */}
                {UserImage ? (
                  <motion.div
                    className="flex w-52 h-52 self-center"
                    initial={{ width: 0, height: 0, opacity: 0 }}
                    animate={{ width: 208, height: 208, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Image
                      src={`${UserImgURL}`}
                      width={200}
                      height={200}
                      alt="User Image"
                      className="rounded-full self-center w-52 h-52 mb-7 shadow-lg shadow-emerald-500"
                    />
                  </motion.div>
                ) : (
                  ""
                )}
                {/* Title */}
                <motion.p
                  className="text-2xl text-white font-semibold mt-3"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  User Information:
                </motion.p>
                {/* Info Container */}
                <motion.div
                  className="flex flex-col pl-4 pt-4 gap-y-6"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {/* Username */}
                  <p className="text-xl text-white">
                    Username: {UserData.username}
                  </p>
                  {/* Email */}
                  <p className="text-xl text-white">
                    Email: {UserData.userEmail}
                  </p>
                </motion.div>
                {UserImage ? (
                  ""
                ) : (
                  //Upload User Image Form
                  <motion.form
                    className="flex flex-col gap-y-4 mt-3 items-center border-b-2 border-sky-900/30 p-4"
                    onSubmit={(e) => e.preventDefault()}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <input
                      type="file"
                      onChange={(e) => setUserImage(e.target.files[0])}
                      className="text-white"
                    />
                    <button
                      className="bg-emerald-500 text-black font-semibold text-xl p-2 pl-4 pr-4 rounded-lg"
                      onClick={() => {
                        UploadProfileImage(UserImage, CurrentUser);
                        setUserImage(null);
                        toast.promise(promise, {
                          loading: "Uploading...",
                          success: () => {
                            return `Your image has been uploaded`;
                          },
                          error: "Error",
                        });
                      }}
                    >
                      Upload Image
                    </button>
                  </motion.form>
                )}
                {/* Admin */}
                {UserData.admin && (
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl self-center text-white font-semibold mt-10"
                  >
                    <Link href={"/admin"} className="flex flex-row items-center gap-x-3">
                      Administrate{" "}
                      <IoPencilSharp className="text-white w-6 h6" />
                    </Link>
                  </motion.div>
                )}
                {/* Log Out Button */}
                <motion.button
                  className="w-80 h-12 p-2 bg-rose-500 self-center rounded-full text-2xl font-semibold mt-20"
                  onClick={HandleLogOut}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Log Out
                </motion.button>
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
}

export default User;
