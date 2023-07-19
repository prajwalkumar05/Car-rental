import React, { useState } from "react";

const Checkout = () => {
  const countries = ["China", "Russia", "UK"];
  const [menu, setMenu] = useState(false);
  const [country, setCountry] = useState("United States");

  const changeText = (e) => {
    setMenu(false);
    setCountry(e.target.textContent);
  };

  return (
    <div className="w-[100%] flex justify-center items-center">
      <div className=" px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
        <div className="flex flex-col justify-start items-start w-full space-y-9">
          

          <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
            <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">
              <label className="mt-8 text-base leading-4 text-gray-800">
                Card details
              </label>
              <div className="mt-2 flex-col">
                <div>
                  <input
                    className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                    type="email"
                    placeholder="0000 1234 6549 15151"
                  />
                </div>
                <div className="flex-row flex">
                  <input
                    className="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                    type="email"
                    placeholder="MM/YY"
                  />
                  <input
                    className="border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                    type="email"
                    placeholder="CVC"
                  />
                </div>
              </div>

              <label className="mt-8 text-base leading-4 text-gray-800">
                Name on card
              </label>
              <div className="mt-2 flex-col">
                <div>
                  <input
                    className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                    type="email"
                    placeholder="Name on card"
                  />
                </div>
              </div>

              <button className="mt-8 border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
                <div>
                  <p className="text-base leading-4">Pay $54652</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
