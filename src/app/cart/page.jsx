"use client";
import React from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux"; //Redux
import { IoTrashSharp } from "react-icons/io5";
import { CartSlice } from "../Redux/CartSlice";
import Header from "@/Components/Header"; //Header
import Menu from "@/Components/Menu"; //Menu

function Cart() {
  const MenuOpen = useSelector((state) => state.MenuSlice.Open);

  const CurrentUser = useSelector((state) => state.UserSlice.User);

  const CartItems = useSelector((state) => state.CartSlice.CartItems);

  const CartTotal = useSelector((state) => state.CartSlice.CartTotal);

  const Dispatch = useDispatch();

  return (
    <main className="flex flex-col min-h-screen bg-sky-950 lg:pl-36 lg:pr-36">
      {MenuOpen ? (
        <Menu />
      ) : (
        <>
          {/* Header */}
          <Header User={CurrentUser} />
          {/* Title */}
          <p className="text-2xl font-semibold pl-2 text-white mt-5 mb-5">
            Cart Items:{" "}
          </p>
          {/* Cart Items */}
          {CartItems.length > 0 ? (
            <div className="flex flex-col gap-y-6 pl-5 pr-5 mt-3 h-80 overflow-hidden overflow-y-scroll">
              {CartItems.map((items, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white w-full p-3 rounded-md flex flex-row justify-between items-center"
                  >
                    <div className="flex flex-row gap-x-2">
                      <Image src={items.image} width={70} height={60} alt="photo" />
                      <div className="flex flex-col">
                        {/* Card Content */}
                        <p className="text-xl">{items.name}</p>
                        <p className="font-semibold">${items.price}</p>
                        <p>Quantity: 1</p>
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
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-xl text-zinc-400">
              There are no items in your cart
            </p>
          )}
          {/* Total Price */}
          <div className="flex ml-2 mr-2 border-t border-sky-800/50 mt-3 text-white text-xl font-semibold p-4">
            Total: ${CartTotal}
          </div>
        </>
      )}
    </main>
  );
}

export default Cart;
