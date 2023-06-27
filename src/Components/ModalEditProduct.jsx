import React, { useState, useEffect } from "react";
import { Categories } from "@/Data/Categories";
import { IoPencilSharp, IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { ListOfProductSlice } from "@/app/Redux/ListOfProductSlice";
import { Audio } from "react-loader-spinner"; //Loader
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";
import {
  collection,
  where,
  query,
  getDocs,
  runTransaction,
  doc,
} from "firebase/firestore"; //Firebase Firestore
import { database } from "@/firebase/Firebase"; //Firebase Database

function ModalEditProduct() {
  useEffect(() => {
    GetProductDB();
  }, []);

  const [IsLoading, setIsLoading] = useState(false);

  const EditProductData = useSelector(
    (state) => state.ListOfProductSlice.ModalData
  );

  const [Name, setName] = useState(`${EditProductData.product.name}`);
  const [Price, setPrice] = useState(`${EditProductData.product.price}`);
  const [Stock, setStock] = useState(`${EditProductData.product.stock}`);
  const [Category, setCategory] = useState(
    `${EditProductData.product.category}`
  );
  const [Available, setAvailable] = useState(
    `${EditProductData.product.available}`
  );
  const [Description, setDescription] = useState(
    `${EditProductData.product.description}`
  );

  const [ProductDocId, setProductDocId] = useState(null);

  const Dispatch = useDispatch();

  const GetProductDB = async () => {
    try {
      setIsLoading(true);
      await getDocs(
        query(
          collection(database, "products"),
          where("name", "==", EditProductData.product.name)
        )
      ).then((products) => {
        products.forEach((product) => {
          setProductDocId(product.id);
        });
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  }; //Get the exact product from the database

  const UpdateProductContent = async () => {
    const DocRef = doc(database, "products", ProductDocId);

    try {
      setIsLoading(true);
      await runTransaction(database, async (transaction) => {
        const doc = await transaction.get(DocRef);
        if (!doc.exists()) {
          console.log("Document does not exist!");
        }

        const newName = (doc.data().name = Name);
        const newPrice = (doc.data().price = Price);
        const newStock = (doc.data().stock = Stock);
        const newCategory = (doc.data().category = Category);
        const newAvailable = (doc.data().available = Available ? false : true);
        const newDescription = (doc.data().description = Description);

        transaction.update(DocRef, {
          name: newName,
          price: newPrice,
          stock: newStock,
          category: newCategory,
          available: newAvailable,
          description: newDescription,
        });
      });
      toast.success("Product was updated successfully!");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong, please try again!");
      console.log(error.message);
    }
  }; //Update the product content in the database

  return (
    <main className="w-full h-full bg-zinc-700/80 absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center">
      <motion.div
        className="w-full md:w-96 h-auto flex flex-col bg-white p-2 rounded-lg gap-y-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold text-gray-700 self-center">
          Edit Product
        </h1>
        {IsLoading ? (
          <div className="flex items-center justify-center self-center w-full h-full">
            <Audio
              height="70"
              width="70"
              radius="9"
              color="gray"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          </div>
        ) : (
          <>
            <Toaster richColors position="top-center" />
            <div className="flex flex-col gap-y-2">
              <label className="text-gray-700">Name</label>
              <input
                type="text"
                className="w-full h-10 rounded-md border border-gray-300 px-2"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-gray-700">Price</label>
              <input
                type="number"
                className="w-full h-10 rounded-md border border-gray-300 px-2"
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-gray-700">Stock</label>
              <input
                type="number"
                className="w-full h-10 rounded-md border border-gray-300 px-2"
                value={Stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-gray-700">Category</label>
              <select
                name="category"
                id="category"
                className="w-full h-10 rounded-md border border-gray-300 px-2"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {Categories.map((category) => {
                  return (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-gray-700">Available</label>
              <select
                name="available"
                id="available"
                className="w-full h-10 rounded-md border border-gray-300 px-2"
                value={Available}
                onChange={(e) => setAvailable(e.target.value)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-gray-700">Description</label>
              <textarea
                name="description"
                id="description"
                maxLength={300}
                className="w-full h-20 rounded-md border border-gray-300 px-2"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-row gap-x-2">
              <button
                className="w-full h-10 bg-emerald-500 text-white rounded-md justify-center flex items-center"
                onClick={UpdateProductContent}
              >
                <IoPencilSharp className="w-5 h-5" />
              </button>
              <button
                className="w-full h-10 bg-rose-600 text-white rounded-md justify-center flex items-center"
                onClick={() => {
                  Dispatch(ListOfProductSlice.actions.OpenModal());
                  Dispatch(ListOfProductSlice.actions.ClearModalData());
                }}
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </motion.div>
    </main>
  );
}

export default ModalEditProduct;
