import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Logo from "@/Icons/Icon.png";
import Image from "next/image";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/Firebase";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { UserSlice } from "../Redux/UserSlice";
import { Toaster, toast } from "sonner";
import { Audio } from "react-loader-spinner";

function LogIn() {
  useEffect(() => {
    GetUserSession();
  }, []);

  const [FormState, setFormState] = useState(false); //Form Login - Create User State
  const [IsLoading, setIsLoading] = useState(false); //Loading State

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
      Router.replace("/home");
    }
  };

  const HandleLogIn = async (e) => {
    e.preventDefault();
    if (Email === "" && Password === "") {
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
            setIsLoading(false);
            Router.replace("/home");
          });
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    }
  };

  const HandelCreateUser = async (e) => {
    e.preventDefault();
    if (Email === "" && Password === "") {
      toast.error("Please complete the form to continue");
    } else {
      try {
        await createUserWithEmailAndPassword(auth, Email, Password)
          .then((user) => {
            Dispatch(
              UserSlice.actions.SetUser({
                userId: user.user.uid,
                userEmail: user.user.email,
              })
            );
            localStorage.setItem("userSession", data);
          })
          .finally(() => {
            Router.replace("/home");
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <main className="flex h-full min-h-screen flex-col items-center justify-center">
      <Toaster richColors position="top-center" />
      {/* Login Form */}
      <form className="flex flex-col items-center p-9 rounded-lg shadow-sm shadow-slate-800">
        <Image
          src={Logo}
          width={100}
          height={100}
          alt="Logo"
          className="mb-14"
        />
        {/* Inputs Container */}
        <div className="flex flex-col gap-y-7 items-center">
          {/* Email */}
          <div className="flex flex-col gap-y-4">
            <label className="text-2xl font-semibold">Email:</label>
            <input
              type="text"
              name="email"
              value={Email}
              className="w-80 h-12 p-2 border-b-2 bg-transparent border-black placeholder:text-zinc-700"
              placeholder="Enter your Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password */}
          <div className="flex flex-col gap-y-4">
            <label className="text-2xl font-semibold">Password:</label>
            <input
              type="password"
              name="password"
              value={Password}
              className="w-80 h-12 p-2 border-b-2 bg-transparent border-black placeholder:text-zinc-700"
              placeholder="Enter your Password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {FormState ? (
          IsLoading ? (
            <Audio
              height="30"
              width="30"
              radius="9"
              color="gray"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          ) : (
            <input
              type="submit"
              value={"Create User"}
              className="mt-9 text-3xl font-bold cursor-pointer"
              onClick={HandelCreateUser}
            />
          )
        ) : IsLoading ? (
          <Audio
            height="30"
            width="30"
            radius="9"
            color="gray"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        ) : (
          <input
            type="submit"
            value={"Log In"}
            className="mt-9 text-3xl font-bold cursor-pointer"
            onClick={HandleLogIn}
          />
        )}
        <div className="mt-5">
          {FormState ? (
            <p className="text-zinc-600 text-md">
              If you already have an account {""}
              <span
                className="cursor-pointer text-black font-semibold hover:border-b-2 hover:border-black"
                onClick={() => setFormState(false)}
              >
                Log In
              </span>
            </p>
          ) : (
            <p className="text-zinc-600 text-md">
              If you don't have an account {""}
              <span
                className="cursor-pointer text-black font-semibold hover:border-b-2 hover:border-black"
                onClick={() => setFormState(true)}
              >
                Create User
              </span>
            </p>
          )}
        </div>
      </form>
    </main>
  );
}

export default LogIn;
