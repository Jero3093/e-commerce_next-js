"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; //Redux
import { ListOfProductSlice } from "../Redux/ListOfProductSlice";
import { useRouter } from "next/navigation"; //Router
import { Audio } from "react-loader-spinner"; //Loader
import {
  IoPencilSharp,
  IoClose,
  IoEllipsisHorizontal,
  IoCheckmarkSharp,
} from "react-icons/io5"; //Icons
import { toast, Toaster } from "sonner";
import { getDocs, collection } from "firebase/firestore"; //Firebase Firestore
import { database } from "@/firebase/Firebase"; //Firebase Database
import { motion } from "framer-motion";
import Header from "@/Components/Header";
import Menu from "@/Components/Menu";
import ModalEditProduct from "@/Components/ModalEditProduct";
import BackButton from "@/Components/BackButton";

export default function EditProducts() {
  useEffect(() => {
    // if (!CurrentUser || !CurrentUser.admin) {
    //   Router.replace("/");
    // } else {
    GetDbProducts();
    // }
  }, []);

  const [IsLoading, setIsLoading] = useState(false); //Loading State

  const [DBProducts, setDBProducts] = useState([]); //Database Products State

  const Router = useRouter(); //Router Hook

  const CurrentUser = useSelector((state) => state.UserSlice.User); //Current User State

  const MenuOpen = useSelector((state) => state.MenuSlice.Open); //Menu State

  const Modal = useSelector((state) => state.ListOfProductSlice.OpenModal); //Modal State

  const Dispatch = useDispatch(); //Redux Dispatch

  const GetDbProducts = async () => {
    let newProducts = [];
    try {
      setIsLoading(true);
      await getDocs(collection(database, "products")).then((products) => {
        products.forEach((product) => {
          newProducts.push({ ...product.data(), id: product.id });
        });
      });
      setDBProducts(newProducts);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  }; //Get Database Products

  const ProductList = () => {
    if (DBProducts.length > 0) {
      return DBProducts.map((product) => {
        return (
          <motion.div
            key={product.id}
            className="flex flex-row justify-between items-center w-full border-b-2 border-gray-700 p-3 flex-wrap"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col items-center w-24">
              <p className="text-white text-xl">Name:</p>
              <h1 className="text-zinc-400 break-keep">
                {product.name.length > 15
                  ? `${product.name.substring(0, 15)}...`
                  : product.name}
              </h1>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white text-xl">Category:</p>
              <h1 className="text-zinc-400">{product.category}</h1>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white text-xl">Price:</p>
              <h1 className="text-zinc-400">{product.price}</h1>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white text-xl">Stock:</p>
              <h1 className="text-zinc-400">{product.stock}</h1>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white text-xl">Available:</p>
              <h1 className="text-zinc-400">
                {product.available ? (
                  <IoCheckmarkSharp className="w-5 h-5 text-emerald-500" />
                ) : (
                  <IoClose className="w-5 h-5 text-rose-600" />
                )}
              </h1>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white text-xl">Create at:</p>
              <h1 className="text-zinc-400">{product.CreatedAt}</h1>
            </div>
            <IoEllipsisHorizontal
              className="text-zinc-400 w-8 h-8 ml-3 cursor-pointer"
              onClick={() => {
                Dispatch(ListOfProductSlice.actions.SetModalData({ product }));
                Dispatch(ListOfProductSlice.actions.OpenModal());
              }}
            />
          </motion.div>
        );
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col lg:pl-36 lg:pr-36 bg-sky-950">
      {MenuOpen ? (
        <Menu />
      ) : (
        <>
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
              {/* Back Button */}
              <BackButton />
              <motion.h1
                className="self-center text-white text-2xl mt-4 font-semibold"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                List of Products
              </motion.h1>
              {/* Products List */}
              <div className="flex flex-col w-full mt-10 items-center justify-center">
                <ProductList />
              </div>
              {Modal && <ModalEditProduct />}
            </>
          )}
        </>
      )}
    </main>
  );
}
