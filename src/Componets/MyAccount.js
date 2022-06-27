import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import visa from "../Componets/image/visa.png";
import master from "../Componets/image/maestro.png";
import ae from "../Componets/image/american-express.png";
import pay from "../Componets/image/paypal.png";
import dis from "../Componets/image/discover.png";
import tf from "../Componets/image/tf.png";
import aj from "../Componets/image/aj.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import { useLocation } from "react-router";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black", text: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black", text: "black" }}
      onClick={onClick}
    />
  );
}

const MyAccount = () => {
  const location = useLocation();
  //for registration
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  //for login
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //for registration
  const handleRegistrationValue = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  //for login
  const handleLoginValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const { from } = location.state || { from: { pathname: "/" } };
  const registrationHandler = async (e) => {
    e.preventDefault();
    const { name, email, newPassword, confirmPassword } = newUser;
    console.log(name, email, newPassword, confirmPassword);
    if (!(name && email && newPassword && confirmPassword)) {
      return toast.error("Fill all field");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Password does not match");
    }
    const data = {
      name,
      email,
      password: newPassword,
      confirmPassword,
    };

    await fetch("https://stark-springs-97568.herokuapp.com/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          toast.success(result.msg);
          window.location.reload();
        } else {
          toast.error(result.msg);
        }
      });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (!(email && password)) {
      return toast.error("Fill all field");
    }

    const data = {
      email,
      password,
    };

    try {
      fetch(
        "https://stark-springs-97568.herokuapp.com/api/user/login",

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            toast.success(result.msg);
            localStorage.setItem("userToken", result.token);
            window.location.reload(from);
          } else {
            toast.error(result.msg);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <Navbar />
      <div className=" mt-16">
        <div className="item1 text-center bg-gray-900 py-14 text-gray-100 ">
          <h3>MY ACCOUNT</h3>
          <p>
            Home<span className="font-bold">{">>"}</span>
            <span className="text-red-500">My Account</span>
          </p>
        </div>

        {/* login */}

        <div className="item2 grid grid-cols-1 md:grid-cols-2 mx-40 my-14">
          <div className="mx-6">
            <h3 className="text-xl py-4 font-semibold">Login Your Account</h3>
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-full">
                <div class="relative">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleLoginValue}
                    class="w-full   border border-gray-300   text-gray-700 py-2 px-3 "
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <input
                    type="password"
                    id="password"
                    onChange={handleLoginValue}
                    placeholder="Password"
                    name="password"
                    class="w-full   border border-gray-300   text-gray-700 py-2 px-3 "
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-3">
              <div>
                <input type="checkbox" />
                <span className="pl-2">Remember me</span>
              </div>
              <h3 className="text-red-600">Forgot Password?</h3>
            </div>
            <button
              onClick={loginHandler}
              className="focus:bg-red-500 focus:text-white py-2 px-5 my-3 border-2 focus:border-0"
            >
              Login
            </button>
          </div>

          {/* Registration */}

          <div className="mx-6">
            <h3 className="text-xl py-4 font-semibold">
              Register Now
              <span className="text-gray-700 text-sm font-normal">
                {" "}
                (If Don't Have Any Account)
              </span>
            </h3>
            <form>
              <div class="flex flex-wrap -m-2">
                <div class="p-2 w-1/2">
                  <div class="relative">
                    <input
                      type="text"
                      id="name"
                      onChange={handleRegistrationValue}
                      placeholder="Name"
                      name="name"
                      class="w-full   border border-gray-300   text-gray-700 py-2 px-3 "
                    />
                  </div>
                </div>
                <div class="p-2 w-1/2">
                  <div class="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleRegistrationValue}
                      placeholder="E-mail"
                      class="w-full   border border-gray-300   text-gray-700 py-2 px-3 "
                    />
                  </div>
                </div>
                <div class="p-2 w-1/2">
                  <div class="relative">
                    <input
                      type="password"
                      id="password"
                      name="newPassword"
                      onChange={handleRegistrationValue}
                      placeholder="Password"
                      class="w-full   border border-gray-300   text-gray-700 py-2 px-3 "
                    />
                  </div>
                </div>
                <div class="p-2 w-1/2">
                  <div class="relative">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      onChange={handleRegistrationValue}
                      placeholder="Confirm Password"
                      class="w-full   border border-gray-300   text-gray-700 py-2 px-3 "
                    />
                  </div>
                </div>
              </div>

              <div className="flex my-3">
                <div>
                  <input type="checkbox" />
                  <span className="text-sm text-gray-700 pl-2">
                    I Accept AllThe Term And Conditions , Including Privacy
                    Policy
                  </span>
                </div>
              </div>
              <button
                type="submit"
                onClick={registrationHandler}
                className="focus:bg-red-500 focus:text-white py-2 px-5 border-2 focus:border-0"
              >
                Register
              </button>
            </form>
          </div>
        </div>

        <div className="item3  mx-44">
          <div className="my-20">
            <Slider {...settings}>
              <div>
                <h3 className="bg-gray-100 p-10 mx-2 text-center">
                  <img src={tf} alt="" className="h-10 " />
                </h3>
              </div>
              <div>
                <h3 className="bg-gray-100 p-10 mx-2 text-center">
                  {" "}
                  <img src={aj} alt="" className="h-10 " />
                </h3>
              </div>
              <div>
                <h3 className="bg-gray-100 p-10 mx-2 text-center">
                  {" "}
                  <img src={tf} alt="" className="h-10 " />
                </h3>
              </div>
              <div>
                <h3 className="bg-gray-100 p-10 mx-2 text-center">
                  {" "}
                  <img src={aj} alt="" className="h-10 " />
                </h3>
              </div>
              <div>
                <h3 className="bg-gray-100 p-10 mx-2 text-center">
                  {" "}
                  <img src={tf} alt="" className="h-10 " />
                </h3>
              </div>
              <div>
                <h3 className="bg-gray-100 p-10 mx-2 text-center">
                  {" "}
                  <img src={aj} alt="" className="h-10 " />
                </h3>
              </div>
              <div>
                <h3 className="bg-gray-100 p-10 mx-2 text-center">
                  {" "}
                  <img src={tf} alt="" className="h-10 " />
                </h3>
              </div>
              <div>
                <h3 className="bg-gray-100 p-10 mx-2 text-center">
                  {" "}
                  <img src={tf} alt="" className="h-10 " />
                </h3>
              </div>
            </Slider>
          </div>
        </div>

        <div className="item4 bg-gray-700">
          <footer class="text-white body-font">
            <div class="container px-5 py-20 mx-auto flex md:items-center lg:items-center md:flex-row md:flex-nowrap flex-wrap flex-col ">
              <div class="flex-grow flex flex-wrap md:pl-40 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                <div class="lg:w-1/4 md:w-1/2 w-full ">
                  <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                    <a class="flex title-font font-medium items-center md:justify-start justify-center text-white mb-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg>
                      <span class="ml-3 text-xl">Tailblocks</span>
                    </a>
                    <p class="mt-2 text-sm text-gray-200">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Tempora accusantium corporis
                    </p>
                    <p class="mt-2 text-sm text-gray-200 pt-2">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
                <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                  <h2 class="title-font font-medium text-white tracking-widest text- mb-6">
                    CONTACT US
                  </h2>
                  <nav class="list-none mb-10 space-y-4">
                    <li>
                      <a class="text-white text-sm ">
                        1234, ParkStreet,Avenue,Newyork
                      </a>
                    </li>
                    <li>
                      <a class="text-white text-sm ">
                        +123 456 78900, +009879 78953
                      </a>
                    </li>
                    <li>
                      <a class="text-white text-sm ">
                        info@e-feri.com, e-feri@info.com
                      </a>
                    </li>
                    <li>
                      <a class="text-white text-sm ">
                        www.e-feri.com,www.infoferi.com
                      </a>
                    </li>
                  </nav>
                </div>
                <div class="lg:w-1/4 md:w-1/2 w-full ">
                  <h2 class="title-font font-medium text-white tracking-widest text- mb-6">
                    MY ACCOUNT
                  </h2>
                  <nav class="list-none  space-y-1.5">
                    <li>
                      <a class="text-white text-sm ">My Account </a>
                    </li>
                    <li>
                      <a class="text-white text-sm ">Wishlist </a>
                    </li>
                    <li>
                      <a class="text-white text-sm ">Shopping Cart </a>
                    </li>
                    <li>
                      <a class="text-white text-sm ">Compare </a>
                    </li>
                    <li>
                      <a class="text-white text-sm ">Checkout </a>
                    </li>
                  </nav>
                </div>
                <div class="lg:w-1/4 md:w-1/2 w-full -ml-28">
                  <h2 class="title-font font-medium text-white tracking-widest text- mb-6">
                    SIGN UP FOR NEWSLETTER
                  </h2>
                  <nav class="list-none mb-10 space-y-5">
                    <li className="flex">
                      <div class="p-2 w-full">
                        <div class="relative">
                          <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Your Mail"
                            onChange={handleLoginValue}
                            class="w-full   border border-gray-300 bg-gray-700  text-gray-700 py-2 px-3 "
                          />
                        </div>
                      </div>
                      <button className="bg-red-500 my-2 -ml-2 px-2">
                        SUBMIT
                      </button>
                    </li>
                    <li>
                      <a class="text-white ">FOLLOW US ON</a>
                    </li>
                    <li>
                      <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start space-x-6">
                        <a class="text-gray-900 bg-white p-2 rounded-full shadow">
                          <svg
                            fill="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                          </svg>
                        </a>
                        <a class="ml-3 bg-white p-2 rounded-full shadow text-gray-900">
                          <svg
                            fill="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                          </svg>
                        </a>
                        <a class="ml-3 bg-white p-2 rounded-full shadow text-gray-900">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <rect
                              width="20"
                              height="20"
                              x="2"
                              y="2"
                              rx="5"
                              ry="5"
                            ></rect>
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                          </svg>
                        </a>
                        <a class="ml-3 bg-white p-2 rounded-full shadow text-gray-900">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <rect
                              width="20"
                              height="20"
                              x="2"
                              y="2"
                              rx="5"
                              ry="5"
                            ></rect>
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                          </svg>
                        </a>
                        <a class="ml-3 bg-white p-2 rounded-full shadow text-gray-900">
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="0"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="none"
                              d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                            ></path>
                            <circle cx="4" cy="4" r="2" stroke="none"></circle>
                          </svg>
                        </a>
                      </span>
                    </li>
                  </nav>
                </div>
              </div>
            </div>
            <div class="bg-gray-600 ">
              <div class="container mx- py-4 pl-52 pr-28 flex flex-col sm:flex-row">
                <p class="text-white  text-center sm:text-left">
                  Copyright © 2017 . All rght reserved by
                  <a
                    href="#"
                    rel="noopener noreferrer"
                    class="text-red-500 ml-1"
                  >
                    E-buy
                  </a>
                </p>
                <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start space-x-3">
                  <a class="text-gray-500">
                    <img src={visa} alt="" className="w-8 " />
                  </a>
                  <a class="text-gray-500">
                    <img src={master} alt="" className="w-8 " />
                  </a>
                  <a class="text-gray-500">
                    <img src={ae} alt="" className="w-8 " />
                  </a>
                  <a class="text-gray-500">
                    <img
                      src={dis}
                      alt=""
                      className="w-8 bg-white px-1 my-1 rounded"
                    />
                  </a>
                  <a class="text-gray-500">
                    <img
                      src={pay}
                      alt=""
                      className="w-8 bg-white px-1 my-1 rounded"
                    />
                  </a>
                </span>
              </div>
            </div>
          </footer>
        </div>

        <Toaster />
      </div>
    </div>
  );
};

export default MyAccount;
