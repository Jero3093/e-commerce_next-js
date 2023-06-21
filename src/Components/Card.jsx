import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { ProductSlice } from "@/app/Redux/ProductSlice";

function Card({ Data }) {
  const Dispatch = useDispatch();

  return (
    <Link
      href={`./details`}
      className="flex flex-col bg-transparent items-center backdrop-blur-sm w-52 h-96 justify-center rounded-lg p-2 gap-y-3 hover:scale-110 hover:shadow-md hover:shadow-emerald-400"
      key={Data.id}
      onClick={() => Dispatch(ProductSlice.actions.SetDetails(Data.id))}
    >
      <Image src={Data.image} width={174} height={100} alt="Image" />
      <div className="flex items-center flex-col mt-auto gap-y-1">
        <p className="text-zinc-400 text-lg">{Data.category}</p>
        <p className="text-white font-bold text-xl">{Data.name}</p>
        <p className="text-white text-lg">$ {Data.price}</p>
      </div>
    </Link>
  );
}

export default Card;
