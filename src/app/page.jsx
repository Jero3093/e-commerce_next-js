"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserSlice } from "./Redux/UserSlice";
import { Products } from "@/Data/Products";
import Header from "@/Components/Header";
import Menu from "@/Components/Menu";
import Footer from "@/Components/Footer";
import Card from "@/Components/Card";

export default function Home() {
  useEffect(() => {
    GetUserSession();
  }, []);

  const [SearchText, setSearchText] = useState(""); //Input Text Value State

  const GetUserSession = () => {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    if (userSession) {
      Dispatch(
        UserSlice.actions.SetUser({
          userId: userSession.userId,
          userEmail: userSession.userEmail,
        })
      );
    }
  }; //Get the Current User Session from the Local Storage

  const Dispatch = useDispatch(); //Dispatch Hook

  const CurrentUser = useSelector((state) => state.UserSlice.User); //Current User State

  const MenuOpen = useSelector((state) => state.MenuSlice.Open); //Menu State

  const FilteredProducts = Products.filter((product) =>
    product.name.toLowerCase().includes(SearchText.toLowerCase())
  ); //Filters the array of products using the search text

  const ProductsList = () => {
    if (SearchText === "") {
      return Products.map((product) => {
        return <Card Data={product} />;
      });
    } else {
      return FilteredProducts.map((product) => {
        return <Card Data={product} />;
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col lg:pl-36 lg:pr-36 bg-sky-950">
      {MenuOpen ? (
        <Menu />
      ) : (
        <>
          <Header User={CurrentUser} />
          {/* Input Search */}
          <input
            type="text"
            className="w-5/6 h-12 p-3 self-center mt-3 bg-transparent border-b-2 border-zinc-400 placeholder:text-zinc-400 outline-none hover:border-2 hover:rounded-lg text-white"
            placeholder="Search for products..."
            value={SearchText}
            onChange={(text) => setSearchText(text.target.value)}
          />
          {/* Products List */}
          <div className="grid flex-col grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center mt-7 gap-y-7">
            <ProductsList />
          </div>
          {/* Footer */}
          <Footer />
        </>
      )}
    </main>
  );
}
