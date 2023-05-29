"use client";
import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux"; //Redux
import { Toaster, toast } from "sonner"; //Notification
import Header from "@/Components/Header"; //Header Component
import Menu from "@/Components/Menu"; //Menu Component
import Footer from "@/Components/Footer"; //Footer Component

export default function Details() {
  const CurrentUser = useSelector((state) => state.UserSlice.User); //Current User Session State

  const Product = useSelector((state) => state.ProductSlice.Details); //Product Slice

  const MenuOpen = useSelector((state) => state.MenuSlice.Open); //Menu Slice

  const AddToCart = () => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
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
          <Header User={CurrentUser} />
          {/* Product Content */}
          <main className="flex flex-col mt-8 md:flex-row md:mx-6 md:gap-x-4 md:mb-5 md:self-center">
            {/* Image */}
            <div className="bg-white w-72 h-full shadow-lg shadow-zinc-500 p-5 border-2 border-zinc-400 rounded-lg self-center">
              <Image src={Product.image} width={250} height={260} />
            </div>
            {/* Information */}
            <section className="flex flex-col gap-y-3 p-4 mt-4 lg:gap-y-5">
              <p className="text-lg text-zinc-400">{Product.category}</p>
              <p className="text-2xl text-white">{Product.name}</p>
              <p className="text-xl text-white">{Product.description}</p>
              <p className="text-xl font-bold text-white">$ {Product.price}</p>
              <p className="text-xl font-bold text-white">
                Stock: {Product.stock}
              </p>
            </section>
          </main>
          {/* Cart Button */}
          <button
            className="flex items-center justify-center self-center w-80 h-12 rounded-full bg-emerald-500 shadow-lg shadow-emerald-800 mt-2 mb-5"
            onClick={AddToCart}
          >
            <p className="text-2xl font-bold">Add to Cart</p>
          </button>
          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}
