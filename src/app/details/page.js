"use client";
import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import Header from "@/Components/Header";
import Menu from "@/Components/Menu";
import Footer from "@/Components/Footer";

export default function page() {
  const Product = useSelector((state) => state.ProductSlice.Details);

  const MenuOpen = useSelector((state) => state.MenuSlice.Open);

  const AddToCart = () => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

    toast.promise(promise, {
      loading: "Loading...",
      success: () => {
        return `${Product.name} has been added to cart`;
      },
      error: "Error",
    });
  };

  return (
    <div className="flex h-full min-h-screen flex-col lg:ml-36 lg:mr-36">
      {MenuOpen ? (
        <Menu />
      ) : (
        <>
          <Toaster position="top-center" />
          {/* Header */}
          <Header />
          {/* Product Content */}
          <main className="flex flex-col mt-8">
            {/* Image */}
            <div className="bg-white w-72 h-full shadow-lg shadow-zinc-500 p-5 border-2 border-zinc-400 rounded-lg self-center">
              <Image src={Product.image} width={250} height={260} />
            </div>
            {/* Information */}
            <section className="flex flex-col gap-y-3 p-4 mt-4">
              <p className="text-lg text-zinc-600">{Product.category}</p>
              <p className="text-2xl">{Product.name}</p>
              <p className="text-xl">{Product.description}</p>
              <p className="text-xl font-bold">$ {Product.price}</p>
            </section>
          </main>
          {/* Cart Button */}
          <button
            className="flex items-center justify-center self-center w-80 h-12 rounded-full bg-emerald-600 shadow-lg shadow-emerald-800 mt-2 mb-5"
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
