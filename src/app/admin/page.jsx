"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; //Redux
import { useRouter } from "next/navigation"; //Next Router
import { getDocs, query, collection, where } from "firebase/firestore"; //Firebase Firestore
import { database } from "@/firebase/Firebase"; //Database
import { Audio } from "react-loader-spinner"; //Loader
import { IoPencilSharp } from "react-icons/io5"; //Icons
import { motion } from "framer-motion";
import Header from "@/Components/Header"; //Header
import Menu from "@/Components/Menu"; //Menu
import AdminOptionCard from "@/Components/AdminOptionCard"; //Admin Option Card
import BackButton from "@/Components/BackButton"; //Back Button

function AdminPage() {
  useEffect(() => {
    if (!CurrentUser) {
      Router.replace("/");
    }
    CheckUserAdmin();
  }, []);

  const [IsLoading, setIsLoading] = useState(false);

  const [UserData, setUserData] = useState();

  const CheckUserAdmin = async () => {
    try {
      setIsLoading(true);
      await getDocs(
        query(collection(database, "users")),
        where("users", "==", CurrentUser.userId)
      ).then((users) => {
        users.forEach((user) => {
          setUserData(user.data());
          console.log(user.data());
          if (user.data().lenght > 3) {
            Router.replace("/user");
          }
        });
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  const CurrentUser = useSelector((state) => state.UserSlice.User);

  const MenuOpen = useSelector((state) => state.MenuSlice.Open);

  const Router = useRouter();

  return (
    <main className="flex min-h-screen flex-col lg:pl-36 lg:pr-36 bg-sky-950">
      {MenuOpen ? (
        <Menu />
      ) : (
        <>
          <Header User={CurrentUser} />
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
              {/* Title */}
              <motion.span
                className="text-white font-semibold text-2xl self-center mt-3 mb-3 flex flex-row gap-x-3 items-center"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Administrate Options{" "}
                <IoPencilSharp className="text-white w-6 h-6" />
              </motion.span>
              {/* Options List */}
              <section className="grid grid-cols-1 self-center items-center pl-2 pr-2 mt-3 w-full gap-y-4 md:grid-cols-2 md:gap-x-4">
                <AdminOptionCard
                  name="Add New Product"
                  href="/newproduct"
                  Soon={false}
                />
                <AdminOptionCard name="Edit Products" href="#" Soon={true} />
              </section>
            </>
          )}
        </>
      )}
    </main>
  );
}

export default AdminPage;
