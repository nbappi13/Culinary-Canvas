"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const DiscountEvents = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const currentUser = user.user || {};
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDiscountFoods = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://b10-a11-server-side-chi.vercel.app/api/discounts/foods"
        );
        setFoods(response.data);
      } catch (error) {
        console.error("Failed to load discount foods:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountFoods();
  }, []);

  const handlePurchaseClick = (food) => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to make a purchase.",
        confirmButtonText: "Go to Login",
      }).then(() => navigate("/login"));
      return;
    }

    const discountInfo = {
      discountedPrice: food.discountedPrice,
      discountPercentage: food.discountPercentage,
      isDiscounted: true,
    };
    sessionStorage.setItem("discountInfo", JSON.stringify(discountInfo));

    navigate(`/purchase/${food._id}`);
  };

  if (loading) {
    return (
      <section className="py-16 mt-10 bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-amber-800 dark:text-amber-400">
            🔥 Limited Time Offers
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 dark:border-amber-400"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 mt-10 bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-800 dark:text-amber-400 mb-3">
            🔥 Limited Time Offers
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Enjoy special discounts on our oldest menu items. These classic
            favorites come with amazing savings!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {foods.length > 0 ? (
            foods.map((food) => {
              const discountPercentage = food.discountPercentage || 30;
              const discountedPrice =
                food.discountedPrice || (food.price * 0.7).toFixed(2);

              return (
                <div
                  key={food._id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-amber-100 dark:border-gray-700"
                >
                  <div className="relative">
                    <img
                      src={food.image || "/placeholder.svg"}
                      alt={food.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-red-500 text-white font-bold py-1 px-3 rounded-bl-lg">
                      {discountPercentage}% OFF
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-2">
                      {food.name}
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="line-through text-gray-500 dark:text-gray-400">
                        ${food.price.toFixed(2)}
                      </span>
                      <span className="font-bold text-2xl text-green-600 dark:text-green-400">
                        ${Number.parseFloat(discountedPrice).toFixed(2)}
                      </span>
                    </div>

                    <div className="bg-amber-50 dark:bg-gray-700 p-2 rounded-lg mb-4">
                      <p className="text-amber-800 dark:text-amber-300 text-sm text-center">
                        Limited time offer! Order now while supplies last.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handlePurchaseClick({
                          _id: food._id,
                          discountedPrice: Number.parseFloat(discountedPrice),
                          discountPercentage,
                        })
                      }
                      className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Purchase
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                No discount items available at the moment.
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Please check back later for special offers!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DiscountEvents;
