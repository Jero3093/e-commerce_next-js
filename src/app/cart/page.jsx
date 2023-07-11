"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; //Next Router
import { useSelector, useDispatch } from "react-redux"; //Redux
import {
  IoTrashSharp,
  IoChevronUp,
  IoChevronDownOutline,
} from "react-icons/io5"; //React Icons
import { CartSlice } from "../Redux/CartSlice"; //Cart Slice
import { motion } from "framer-motion"; //Framer Motion
import Header from "@/Components/Header"; //Header
import Menu from "@/Components/Menu"; //Menu
import CartModal from "@/Components/CartModal"; //Cart Modal
import Footer from "@/Components/Footer"; //Footer
import BackButton from "@/Components/BackButton"; //Back Button

function Cart() {
  useEffect(() => {
    if (!CurrentUser) {
      Router.push("/");
      return;
    }
  }, []);

  const CurrentUser = useSelector((state) => state.UserSlice.User); //Current User

  const MenuOpen = useSelector((state) => state.MenuSlice.Open); //Menu State

  const CartItems = useSelector((state) => state.CartSlice.CartItems); //Cart Items

  const CartTotal = useSelector((state) => state.CartSlice.CartTotal); //Cart Total Price

  const ModalCart = useSelector((state) => state.CartSlice.CartModal); //Cart Modal State

  const Dispatch = useDispatch(); //Redux Dispatch

  const Router = useRouter(); //Next Router

  return (
    <main className="flex flex-col min-h-screen bg-sky-950 lg:pl-36 lg:pr-36">
      {MenuOpen ? (
        <Menu />
      ) : (
        <>
          {/* Header */}
          <Header />
          {/* Back Button */}
          <BackButton />
          {/* Title */}
          <motion.p
            className="text-2xl font-semibold pl-2 text-white mt-5 mb-5 ml-2 mr-2"
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Cart Items:{" "}
          </motion.p>
          {/* Cart Items */}
          {CartItems.length > 0 ? (
            <div className="flex flex-col gap-y-6 pl-5 pr-5 mt-3 h-80 overflow-hidden overflow-y-scroll">
              {CartItems.map((items, index) => {
                return (
                  <motion.div
                    key={index}
                    className="bg-white w-full p-3 rounded-md flex flex-row justify-between items-center"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex flex-row gap-x-2">
                      <Image
                        src={items.image}
                        width={70}
                        height={60}
                        alt="photo"
                      />
                      <div className="flex flex-col">
                        {/* Card Content */}
                        <p className="text-xl">{items.name}</p>
                        <p className="font-semibold">${items.price}</p>
                        <span className="flex flex-row gap-x-2">
                          Quantity:{" "}
                          <span className="flex flex-row gap-x-2 items-center">
                            <IoChevronUp
                              onClick={() =>
                                Dispatch(
                                  CartSlice.actions.IncreaseQuantity(items.id)
                                )
                              }
                            />
                            {items.quantity}
                            <IoChevronDownOutline
                              onClick={() =>
                                Dispatch(
                                  CartSlice.actions.DecreaseQuantity(items.id)
                                )
                              }
                            />
                          </span>
                          {/* {SelectProductQuantity()} */}
                        </span>
                      </div>
                    </div>
                    <IoTrashSharp
                      className="text-rose-500 w-8 h-8 cursor-pointer"
                      onClick={() =>
                        Dispatch(
                          CartSlice.actions.DeleteCartItem({ Data: items })
                        )
                      }
                    />
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.p
              className="text-center text-xl text-zinc-400"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              There are no items in your cart
            </motion.p>
          )}
          <div className="flex flex-col md:flex-row justify-between border-t border-sky-800/50 mt-3 items-center ml-4 mr-4 lg:ml-0 lg:mr-0">
            {/* Total Price */}
            <motion.div
              className="flex ml-2 mr-2 text-white text-xl font-semibold p-4"
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Total: ${CartTotal}
            </motion.div>
            {/* Payment Button */}
            {CartItems.length > 0 ? (
              <motion.button
                className="p-2 pl-3 pr-3 mt-3 ml-2 mr-2 h-12 rounded-full text-2xl font-semibold text-emerald-300"
                onClick={() => Dispatch(CartSlice.actions.SetCartModal())}
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Finish Payment
              </motion.button>
            ) : (
              ""
            )}
          </div>
          {/* Cart Modal */}
          {ModalCart ? <CartModal /> : null}
        </>
      )}
      <Footer />
    </main>
  );
}

export default Cart;
