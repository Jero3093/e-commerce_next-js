"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; //Redux
import { Audio } from "react-loader-spinner"; //Loader Spinner
import { toast, Toaster } from "sonner"; //Notifications
import { ProductSlice } from "./Redux/ProductSlice"; //Product Slice
import { database } from "@/firebase/Firebase"; //Firebase Database
import { collection, getDocs, query, where } from "firebase/firestore"; //Firebase Firestore
import { motion } from "framer-motion"; //Framer Motion
import Header from "@/Components/Header"; //Header
import Menu from "@/Components/Menu"; //Menu
import Footer from "@/Components/Footer"; //Footer
import Card from "@/Components/Card"; //Card
import Banner from "@/Components/Banner"; //Banner

export default function Home() {
  useEffect(() => {
    GetProductsFromDB();
  }, []);

  const [IsLoading, setIsLoading] = useState(false); //Loading State

  const [SearchText, setSearchText] = useState(""); //Input Text Value State

  const DBProducts = useSelector((state) => state.ProductSlice.DBProducts); //Products State

  const MenuOpen = useSelector((state) => state.MenuSlice.Open); //Menu State

  const Dispatch = useDispatch(); //Dispatch

  const GetProductsFromDB = async () => {
    try {
      Dispatch(ProductSlice.actions.SetCleaerDBProducts());
      setIsLoading(true);
      await getDocs(
        query(collection(database, "products"), where("available", "==", true))
      ).then((products) => {
        if (products.empty) {
          toast.error("No products available");
          console.log("No products available");
          setIsLoading(false);
          return;
        }
        products.forEach((product) => {
          let data = { ...product.data(), id: product.id };
          Dispatch(ProductSlice.actions.SetDBProducts(data));
        });
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  }; //Gets the products from the database

  const FilteredProducts = DBProducts.filter((product) =>
    product.name.toLowerCase().includes(SearchText.toLowerCase())
  ); //Filters the array of products using the search text

  const ProductsList = () => {
    if (SearchText === "") {
      return DBProducts.map((product) => {
        return <Card Data={product} />;
      });
    } else {
      return FilteredProducts.map((product) => {
        return <Card Data={product} />;
      });
    }
  }; //Returns the products list

  return (
    <main className="flex min-h-screen flex-col lg:pl-36 lg:pr-36 bg-sky-950">
      {MenuOpen ? (
        <Menu />
      ) : (
        <>
          {/* Notifications */}
          <Toaster richColors position="top-center" />
          {/* Header */}
          <Header />
          {IsLoading ? (
            <div className="flex items-center justify-center mt-96">
              <Audio
                height="70"
                width="70"
                radius="9"
                color="white"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
            </div>
          ) : (
            <>
              {/* Banner */}
              <Banner />
              {/* Input Search */}
              <motion.input
                type="text"
                className="w-5/6 h-12 p-3 self-center mt-3 bg-transparent border-b-2 border-zinc-400 placeholder:text-zinc-400 outline-none hover:border-2 hover:rounded-lg text-white"
                placeholder="Search products..."
                value={SearchText}
                onChange={(text) => setSearchText(text.target.value)}
                initial={{ x: 100, opacity: 0 }}
                animate={{ opacity: 1, x: 0 }}
              />
              {DBProducts.length === 0 ? (
                <motion.h1
                  className="text-2xl text-white font-semibold self-center mt-6"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  No Products Available
                </motion.h1>
              ) : (
                // Products List
                <motion.div
                  className="grid flex-col grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center mt-9 gap-y-1 md:gap-y-9 pb-4"
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <ProductsList />
                </motion.div>
              )}
            </>
          )}
          {/* Footer */}
          <Footer />
        </>
      )}
    </main>
  );
}
