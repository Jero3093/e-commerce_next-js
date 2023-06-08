"use client";
import React, { useState, useEffect } from "react";
import Logo from "@/Icons/Icon.png";
import Image from "next/image";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"; //Firebase Auth Functions
import { auth } from "@/firebase/Firebase"; //Firebase Authentication
import { useRouter } from "next/navigation"; //Navigation
import { useDispatch } from "react-redux"; //Redux
import { UserSlice } from "../Redux/UserSlice"; //UserSlice
import { Toaster, toast } from "sonner"; //Notifications
import { Audio } from "react-loader-spinner"; //Loader
import { database } from "@/firebase/Firebase"; //Firebase Database
import { collection, addDoc } from "firebase/firestore"; //Firestore
import { motion } from "framer-motion";

function LogIn() {
  useEffect(() => {
    GetUserSession();
  }, []);

  const [FormState, setFormState] = useState(false); //Form Login - Create User State
  const [IsLoading, setIsLoading] = useState(false); //Loading State

  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState(""); //Email State
  const [Password, setPassword] = useState(""); //Password State

  const Router = useRouter(); //Route Hook

  const Dispatch = useDispatch(); //Dispatch Hook

  const GetUserSession = () => {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    if (userSession) {
      Dispatch(
        UserSlice.actions.SetUser({
          userId: userSession.userId,
          userEmail: userSession.email,
        })
      );
      Router.replace("/");
    }
  };

  const HandleLogIn = async (e) => {
    e.preventDefault();
    if (Email === "" || Password === "") {
      toast.error("Please complete the form to continue");
    } else {
      try {
        setIsLoading(true);
        await signInWithEmailAndPassword(auth, Email, Password)
          .then((user) => {
            Dispatch(
              UserSlice.actions.SetUser({
                userId: user.user.uid,
                userEmail: user.user.email,
              })
            );
            const data = JSON.stringify({
              userId: user.user.uid,
              userEmail: user.user.email,
            });
            localStorage.setItem("userSession", data);
            setIsLoading(false);
          })
          .finally(() => {
            toast.success("You logged into your account");
            setIsLoading(false);
            Router.replace("/");
          });
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    }
  };

  const HandelCreateUser = async (e) => {
    e.preventDefault();
    if (Username === "" || Email === "" || Password === "") {
      toast.error("Please complete the form to continue");
    } else {
      try {
        setIsLoading(true);
        await createUserWithEmailAndPassword(auth, Email, Password)
          .then(async (user) => {
            Dispatch(
              UserSlice.actions.SetUser({
                userId: user.user.uid,
                userEmail: user.user.email,
              })
            );
            const data = JSON.stringify({
              userId: user.user.uid,
              userEmail: user.user.email,
            });
            localStorage.setItem("userSession", data);
            await addDoc(collection(database, "users"), {
              userId: user.user.uid,
              username: Username,
              userEmail: user.user.email,
            });
            setIsLoading(false);
          })
          .finally(() => {
            toast.success("You successfully created a new user");
            setIsLoading(false);
            Router.replace("/");
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Toaster richColors position="top-center" />
      {/* Login Form */}
      <form className="flex flex-col items-center p-9 rounded-lg lg:shadow-sm lg:shadow-slate-500">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Image
            src={Logo}
            width={100}
            height={100}
            alt="Logo"
            className="mb-14"
          />
        </motion.div>
        {/* Inputs Container */}
        <div className="flex flex-col gap-y-7 items-centefr">
          {FormState ? (
            //Username
            <motion.div
              className="flex flex-col gap-y-4"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="text-2xl font-semibold text-white">
                Username:
              </label>
              <input
                type="text"
                name="username"
                value={Username}
                className="w-80 h-12 p-2 border-b-2 bg-transparent border-zinc-500 placeholder:text-zinc-600 text-white"
                placeholder="Enter your Username..."
                onChange={(e) => setUsername(e.target.value)}
              />
            </motion.div>
          ) : (
            ""
          )}
          {/* Email */}
          <motion.div
            className="flex flex-col gap-y-4"
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="text-2xl font-semibold text-white">Email:</label>
            <input
              type="text"
              name="email"
              value={Email}
              className="w-80 h-12 p-2 border-b-2 bg-transparent border-zinc-500 placeholder:text-zinc-600 text-white"
              placeholder="Enter your Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>
          {/* Password */}
          <motion.div
            className="flex flex-col gap-y-4"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="text-2xl font-semibold text-white">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={Password}
              className="w-80 h-12 p-2 border-b-2 bg-transparent border-zinc-500 placeholder:text-zinc-600 text-white"
              placeholder="Enter your Password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>
        </div>
        {FormState ? (
          IsLoading ? (
            <Audio
              height="30"
              width="30"
              radius="9"
              color="white"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          ) : (
            <motion.input
              type="submit"
              value={"Create User"}
              className="mt-9 text-3xl font-bold cursor-pointer text-white"
              onClick={HandelCreateUser}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            />
          )
        ) : IsLoading ? (
          <Audio
            height="30"
            width="30"
            radius="9"
            color="white"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        ) : (
          <motion.input
            type="submit"
            value={"Log In"}
            className="mt-9 text-3xl font-bold cursor-pointer text-white"
            onClick={HandleLogIn}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          />
        )}
        <div className="mt-5">
          {FormState ? (
            <motion.p
              className="text-zinc-400 text-md"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              If you already have an account {""}
              <span
                className="cursor-pointer font-semibold hover:border-b-2 hover:border-white hover:text-white text-zinc-400"
                onClick={() => setFormState(false)}
              >
                Log In
              </span>
            </motion.p>
          ) : (
            <motion.p
              className="text-zinc-400 text-md"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              If you don't have an account {""}
              <span
                className="cursor-pointer font-semibold hover:border-b-2 hover:border-white hover:text-white text-zinc-400"
                onClick={() => setFormState(true)}
              >
                Create User
              </span>
            </motion.p>
          )}
        </div>
      </form>
    </main>
  );
}

export default LogIn;
