"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Products } from "@/Data/Products"; //Products
import Menu from "@/Components/Menu"; //Menu Component
import Header from "@/Components/Header"; //Header Component
import Card from "@/Components/Card"; //Card Component
import Footer from "@/Components/Footer"; //Footer Component

export default function Home() {
  const [SearchText, setSearchText] = useState(""); //Input Text Value State

  const MenuOpen = useSelector((state) => state.MenuSlice.Open); //Menu State

  const FilteredProducts = Products.filter((product) =>
    product.name.toLowerCase().includes(SearchText.toLowerCase())
  );

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
    <main className="flex h-full min-h-screen flex-col lg:ml-36 lg:mr-36">
      {MenuOpen ? (
        <Menu />
      ) : (
        <>
          <Header />
          {/* Input Search */}
          <input
            type="text"
            className="w-5/6 h-12 p-3 self-center mt-3 bg-transparent border-b-2 border-zinc-700 placeholder:text-zinc-700 outline-none hover:border-2 hover:rounded-lg"
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
