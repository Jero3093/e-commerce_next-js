"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CartSlice } from "@/app/Redux/CartSlice";
import { motion } from "framer-motion";
import { IoPerson, IoCard } from "react-icons/io5";
import { Toaster, toast } from "sonner";

function CartModal() {
  const [Name, setName] = useState(""); //Name State

  const [CreditCard, setCreditCard] = useState(""); //Credit Card State

  const Dispatch = useDispatch(); //Redux Dispatch

  const Pay = () => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
    if (Name === "" || CreditCard === "") {
      toast.error("Please enter your name and card number");
    } else {
      toast.promise(promise, {
        loading: "loading...",
        success: () => {
          Dispatch(CartSlice.actions.SetCartModal());
          Dispatch(CartSlice.actions.ClearCart());
          return `${Name} the payment has successfully, the products will be delivered soon.`;
        },
        error: "Error please try again",
      });
    }
  }; //Pay Function

  return (
    <main className="w-full h-full bg-zinc-700/80 absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center">
      <Toaster richColors position="top-center" />
      <motion.div
        className="flex flex-col bg-zinc-200 w-96 h-96 p-2 rounded-md"
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Title */}
        <p className="self-center text-2xl font-semibold">Payment Form</p>
        {/* Inputs */}
        <div className="flex flex-col gap-y-4 items-center m-auto">
          {/* Name */}
          <div className="flex flex-col gap-y-2">
            <label htmlFor="" className="text-xl">
              Full Name:
            </label>
            <div className="flex flex-row items-center border-b border-black p-2">
              <IoPerson className="w-6 h-6 mr-4" />
              <input
                type="text"
                name="name"
                id=""
                placeholder="Full Name:"
                className="bg-transparent outline-none h-9 w-64"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          {/* Credit Card */}
          <div className="flex flex-col gap-y-2">
            <label htmlFor="" className="text-xl">
              Credit Card:
            </label>
            <div className="flex flex-row items-center border-b border-black p-2">
              <IoCard className="w-6 h-6 mr-4" />
              <input
                type="number"
                name="name"
                id=""
                placeholder="Credit Card Number:"
                className="bg-transparent outline-none h-9 w-64"
                onChange={(e) => setCreditCard(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Pay Button */}
        <button
          className="w-44 h-10 rounded-full text-white bg-slate-900 text-xl self-center mt-3 mb-3"
          onClick={Pay}
        >
          Pay
        </button>
        {/* Cancel Button */}
        <button
          className="text-xl font-semibold self-center mt-auto"
          onClick={() => {
            setName("");
            setCreditCard("");
            Dispatch(CartSlice.actions.SetCartModal());
          }}
        >
          Cancel
        </button>
      </motion.div>
    </main>
  );
}

export default CartModal;
