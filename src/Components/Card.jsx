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
      className="flex flex-col bg-slate-50 items-center backdrop-blur-sm w-44 h-64 justify-center rounded-lg p-2 gap-y-3 shadow-sm shadow-zinc-400 hover:scale-110 hover:shadow-lg hover:shadow-emerald-400"
      key={Data.id}
      onClick={() => Dispatch(ProductSlice.actions.SetDetails(Data.id))}
    >
      <Image src={Data.image} width={100} height={100} alt="Image" />
      <div className="flex items-center flex-col mt-auto gap-y-1">
        <p className="text-zinc-500 text-md">{Data.category}</p>
        <p className="text-black font-bold text-lg">{Data.name}</p>
        <p className="text-black">$ {Data.price}</p>
      </div>
    </Link>
  );
}

export default Card;
