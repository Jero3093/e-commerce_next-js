import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux"; //Redux
import { motion } from "framer-motion"; //Framer Motion
import { database } from "@/firebase/Firebase"; //Firebase Database
import { collection, getDocs, query, limit } from "firebase/firestore"; //Firebase Firestore
import { ProductSlice } from "@/app/Redux/ProductSlice";

function Banner() {
  useEffect(() => {
    GetBannerProduct();
  }, []);

  const [BannerData, setBannerData] = useState();

  const Dispatch = useDispatch();

  const Router = useRouter();

  const GetBannerProduct = async () => {
    try {
      await getDocs(query(collection(database, "products"), limit(1))).then(
        (banners) => {
          banners.forEach((banner) => {
            setBannerData({ ...banner.data(), id: banner.id });
            console.log(BannerData);
          });
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <motion.main
      className="flex flex-col items-center w-full h-fit p-2 overflow-hidden mb-2 md:flex-row-reverse"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      {BannerData && (
        <>
          {/* Image */}
          <Image
            src={BannerData.image}
            width={250}
            height={250}
            className="object-cover"
          />
          {/* Content */}
          <div className="flex flex-col w-full pl-6 pr-6 gap-y-1 md:gap-y-3">
            <h1 className="text-xl font-semibold text-zinc-400">
              {BannerData && BannerData.category}
            </h1>
            <p className="text-2xl text-white font-semibold">
              {BannerData && BannerData.name}
            </p>
            <p className="text-lg text-zinc-300">
              {BannerData && BannerData.description.length > 150
                ? BannerData.description.substring(0, 150) + "..."
                : BannerData.description}
            </p>
            {/* Details Button */}
            <button
              className="w-52 h-12 rounded-lg bg-transparent border-2 border-emerald-500 text-xl text-emerald-500 flex items-center justify-center mt-3 hover:bg-emerald-500 hover:text-white"
              onClick={() => {
                Dispatch(ProductSlice.actions.SetDetails(BannerData));
                Router.push("/details");
              }}
            >
              Get Details
            </button>
          </div>
        </>
      )}
    </motion.main>
  );
}

export default Banner;
