"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux"; //Redux
import { Toaster, toast } from "sonner"; //Notification
import { CartSlice } from "../Redux/CartSlice"; //Cart Slice
import { motion } from "framer-motion";
import Header from "@/Components/Header"; //Header Component
import Menu from "@/Components/Menu"; //Menu Component
import Footer from "@/Components/Footer"; //Footer Component

export default function Details() {
  useEffect(() => {
    if (!CurrentUser || !Product) {
      Router.replace("/");
      return;
    }
  }, []);

  const CurrentUser = useSelector((state) => state.UserSlice.User); //Current User Session State

  const Product = useSelector((state) => state.ProductSlice.Details); //Product Slice

  const MenuOpen = useSelector((state) => state.MenuSlice.Open); //Menu Slice

  const Dispatch = useDispatch(); //Dispatch Hook

  const Router = useRouter(); //Router Hook

  const AddToCart = () => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 1000));
    if (!CurrentUser) {
      toast.error("You must be logged in to add a product to your cart");
    } else {
      toast.promise(promise, {
        loading: "Loading...",
        success: () => {
          return `${Product.name} has been added to cart`;
        },
        error: "Error",
      });
      Dispatch(CartSlice.actions.SetCartItem({ Data: Product }));
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:pl-36 lg:pr-36 bg-sky-950">
      {MenuOpen ? (
        <Menu />
      ) : (
        <>
          <Toaster position="top-center" richColors />
          {/* Header */}
          <Header />
          {/* Product Content */}
          <main className="flex flex-col mt-8 md:flex-row md:mx-6 md:gap-x-4 md:mb-5 md:self-center">
            {/* Image */}
            <motion.div
              className="flex bg-white w-full h-full shadow-lg shadow-zinc-500 p-5 border-2 border-zinc-400 rounded-lg self-center items-center
              md:max-w-full md:h-96 justify-center lg:max-w-fit"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Image src={Product.image} width={320} height={320} alt="photo"  />
            </motion.div>
            {/* Information */}
            <motion.section
              className="flex flex-col gap-y-3 p-4 mt-4 lg:gap-y-5"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-lg text-zinc-400">{Product.category}</p>
              <p className="text-2xl text-white">{Product.name}</p>
              <p className="text-xl text-white">{Product.description}</p>
              <p className="text-xl font-bold text-white">$ {Product.price}</p>
              <p className="text-xl font-bold text-white">
                Stock: {Product.stock}
              </p>
            </motion.section>
          </main>
          {/* Cart Button */}
          <motion.button
            className="flex items-center justify-center self-center w-80 h-12 rounded-full bg-emerald-500 shadow-lg shadow-emerald-800 mt-2 mb-5"
            onClick={AddToCart}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-2xl font-bold">Add to Cart</p>
          </motion.button>
          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}
