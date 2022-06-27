import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { toast } from "react-hot-toast";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { userContext } from "../App";

const Navbar = () => {
  const [user, setUser] = useContext(userContext);

  const logoutHandler = async () => {
    localStorage.removeItem("userToken");
    toast.success("Logout successfully");
    window.location.href = "/";
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <Disclosure
      as="nav"
      className="bg-white fixed shadow top-0 left-0   right-0 z-50 text-black"
    >
      {({ open }) => (
        <>
          <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between py-3">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className=" flex-1 flex pl-12 md:items-center  md:justify-center sm:items-stretch sm:justify-start">
                <div className="  flex-shrink-0 flex items-center text-lg md:text-3xl mr-2">
                  <Link to="/">
                    <h2>BUY</h2>
                  </Link>
                </div>

                <div className="hidden sm:block sm:ml-6  mx-auto">
                  <div className="flex space-x-4 ml-40">
                    {user?.isAuthenticated ? (
                      <div>
                        {user && user?.user?.role === "admin" && (
                          <Link to="/Dashboard">
                            <a className="  px-3 py-2 rounded-md text-lg font-">
                              Admin Panel
                            </a>
                          </Link>
                        )}
                        <Link to="#">
                          <a className="  px-3 py-2 rounded-md text-lg font-">
                            Home
                          </a>
                        </Link>
                        <Link to="#">
                          <a className="  px-3 py-2 rounded-md text-lg font-">
                            About
                          </a>
                        </Link>
                        <Link to="#">
                          <a className="  px-3 py-2 rounded-md text-lg font-">
                            Shop
                          </a>
                        </Link>
                        <Link to="#">
                          <a className="  px-3 py-2 rounded-md text-lg font-">
                            Pages
                          </a>
                        </Link>
                        <Link to="#">
                          <a className="  px-3 py-2 rounded-md text-lg font-">
                            Blog
                          </a>
                        </Link>
                        <Link to="#">
                          <a className="  px-3 py-2 rounded-md text-lg font-">
                            Contact
                          </a>
                        </Link>
                        <button
                          onClick={logoutHandler}
                          className="  px-3 py-2 rounded-md text-lg font-"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Link to="#">
                          <a className="  px-3 py-2 rounded-md text-lg font-">
                            Home
                          </a>
                        </Link>
                        <Link to="#">
                          <a className="  px-3 py-2 rounded-md text-lg font-">
                            About
                          </a>
                        </Link>
                        <Link to="#">
                          <a className="  px-3 py-2 rounded-md text-lg font-">
                            Shop
                          </a>
                        </Link>
                        <Link to="#">
                          <a className="  px-3 py-2 rounded-md text-lg font-">
                            Pages
                          </a>
                        </Link>
                        <Link to="#">
                          <a className="  px-3 py-2 rounded-md text-lg font-">
                            Blog
                          </a>
                        </Link>
                        <Link to="#">
                          <a className="  px-3 py-2 rounded-md text-lg font-">
                            Contact
                          </a>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mr-16">
                <div className="flex my-2">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 mt-"
                      viewBox="0 0 20 20"
                      fill="#fa4343"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className=" text-red-500">2 items</h3>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 flex">
              <Disclosure.Button>
                <Link to="/admin_dashboard">
                  <a className=" text-white px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </a>
                </Link>
                <Link to="/v1/products">
                  <a className=" text-white px-3 py-2 rounded-md text-sm font-medium">
                    Products
                  </a>
                </Link>
                {/* <div className="w-full px-4">
                  <Search />
                </div> */}
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
