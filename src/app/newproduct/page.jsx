"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; //Redux
import { toast, Toaster } from "sonner"; //Notifications
import { collection, addDoc, getDocs, where, query } from "firebase/firestore"; //Firebase Firestore
import { database } from "@/firebase/Firebase"; //Firebase Database
import { Audio } from "react-loader-spinner"; //Loader
import { useRouter } from "next/navigation"; //Router
import { Categories } from "@/Data/Categories"; //Categories Data
import { motion } from "framer-motion";
import Header from "@/Components/Header"; //Header
import Menu from "@/Components/Menu"; //Menu
import BackButton from "@/Components/BackButton"; //BackButton

export default function NewProduct() {
  useEffect(() => {
    if (!CurrentUser || !CurrentUser.admin) {
      router.push("/");
    }
  }, []);

  const [IsLoading, setIsLoading] = useState(false); //Loading State

  const [CheckName, setCheckName] = useState(false); //Check Name State

  const [Name, setName] = useState(""); //Name State
  const [Description, setDescription] = useState(""); //Description State
  const [Price, setPrice] = useState(""); //Price State
  const [Stock, setStock] = useState(""); //Stock State
  const [Category, setCategory] = useState(); //Category State

  const CurrentUser = useSelector((state) => state.UserSlice.User); //Current User

  const MenuOpen = useSelector((state) => state.MenuSlice.Open); //Menu State

  const router = useRouter(); //Router

  const CheckProductName = async () => {
    const q = query(
      collection(database, "products"),
      where("name", "==", Name)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        toast.error("This product already exists");
        setCheckName(true);
        console.log(doc.data());
      } else {
        setCheckName(false);
      }
    });
  }; //Check if product name already exists

  const AddProductToDB = async () => {
    if (
      Name === "" ||
      Description === "" ||
      Price === "" ||
      Stock === "" ||
      Category === ""
    ) {
      toast.error("Please fill all the fields to continue");
    } else if (CheckName) {
      toast.error(
        "This product already exists, please change the name to continue"
      );
    } else {
      const date = new Date();

      let currentDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
      let Data = {
        name: Name,
        description: Description,
        price: Price,
        stock: Stock,
        category: Category,
        CreatedBy: CurrentUser.userId,
        CreatedAt: currentDate,
        available: false,
        image: null,
      };
      try {
        setIsLoading(true);
        await addDoc(collection(database, "products"), Data).then(() => {
          setName("");
          setDescription("");
          setPrice("");
          setStock("");
          setCategory("");
        });
        setIsLoading(false);
        toast.success("Product was been added successfully");
      } catch (error) {
        setIsLoading(false);
        toast.error("Error adding product: ", error);
        console.log(error.message);
      }
    }
  }; //Add Product to Database

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
                height="80"
                width="80"
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
                className="text-white font-semibold self-center text-2xl mt-3"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Add New Product
              </motion.h1>
              {/* Add Product Form */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col items-center mt-5 gap-y-3"
              >
                {/* Name */}
                <motion.div
                  className="flex flex-col gap-y-3"
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="name" className="text-white">
                    Name:{" "}
                    {CheckName && (
                      <motion.span
                        className="text-red-500"
                        initial={{ x: 10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                      >
                        (Name already taken)
                      </motion.span>
                    )}
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="w-80 h-12 rounded-lg bg-transparent border-2 border-zinc-500 p-2 text-white"
                    value={Name}
                    onChange={(e) => {
                      setName(e.target.value);
                      CheckProductName();
                    }}
                    required
                    autoComplete="off"
                  />
                </motion.div>
                {/* Price */}
                <motion.div
                  className="flex flex-col gap-y-3"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label htmlFor="price" className="text-white">
                    Price:
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="w-80 h-12 rounded-lg bg-transparent border-2 border-zinc-500 p-2 text-white"
                    value={Price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </motion.div>
                {/* Stock */}
                <motion.div
                  className="flex flex-col gap-y-3"
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label htmlFor="stock" className="text-white">
                    Stock:
                  </label>
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    className="w-80 h-12 rounded-lg bg-transparent border-2 border-zinc-500 p-2 text-white"
                    value={Stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </motion.div>
                {/* Category */}
                <motion.div
                  className="flex flex-col gap-y-3"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label htmlFor="category" className="text-white">
                    Category:
                  </label>
                  <select
                    name="category"
                    id="category"
                    className="w-80 h-12 rounded-lg bg-transparent border-2 border-zinc-500 p-2 text-white"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    {Categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.name}
                        className="text-black"
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </motion.div>
                {/* Description */}
                <motion.div
                  className="flex flex-col gap-y-3"
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <label htmlFor="description" className="text-white">
                    Description:{" "}
                    <span className="text-zinc-400">(Max 300 characters)</span>
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    className="w-80 h-32 rounded-lg bg-transparent border-2 border-zinc-500 p-2 text-white"
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    maxLength={300}
                  />
                </motion.div>
                <motion.input
                  type="submit"
                  value="Add Product"
                  className="text-2xl text-emerald-400 cursor-pointer"
                  onClick={AddProductToDB}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                />
              </form>
            </>
          )}
        </>
      )}
    </main>
  );
}
