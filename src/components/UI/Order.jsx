import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import useGetData from "../../hooks/useGetData";
import OrderList from "./OrderList";

const Order = () => {
  const { user } = useAuthContext();

  const { result } = useGetData("users", user.uid);
  console.log(result);

  if (!result) {
    return <p>Loading</p>;
  }

  return <div className="flex justify-center w-[100%]">
    <div className="px-4 md:px-10 py-4 md:py-7">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">All Orders</p>
                        <div className="mt-4 sm:mt-0">
                            <button className="inline-flex sm:ml-3 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                                <p className="text-sm font-medium leading-none text-white">Lists</p>
                            </button>
                        </div>
                    </div>
                    {result.orders.map((item,i) =>{
                      return <OrderList key={i} item={item} />
                    })}
                </div>
  </div>;
};

export default Order;
