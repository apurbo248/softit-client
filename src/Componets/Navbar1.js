import React, { useContext, useEffect } from "react";

import { Fragment } from "react";
import { toast } from "react-hot-toast";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { userContext } from "../App";
import { Link } from "react-router-dom";

const Navbar1 = () => {
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
      className=" fixed top-0 left-0 shadow bg-white right-0 z-50"
    >
      {({ open }) => (
        <>
          <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
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
                  <div className="flex space-x-4 ml-52">
                    {user?.isAuthenticated &&
                      user &&
                      user?.user?.role === "admin" && (
                        <div>
                          <Link to="/Dashboard">
                            <a className="  px-3 py-2 rounded-md text-sm font-medium">
                              Dashboard
                            </a>
                          </Link>
                          <Link to="/admin/users">
                            <a className="  px-3 py-2 rounded-md text-sm font-medium">
                              Users
                            </a>
                          </Link>
                          <Link to="/admin/categories">
                            <a className="  px-3 py-2 rounded-md text-sm font-medium">
                              Category
                            </a>
                          </Link>
                          <Link to="/admin/products">
                            <a className="  px-3 py-2 rounded-md text-sm font-medium">
                              Product
                            </a>
                          </Link>
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center   sm:static sm:inset-auto  sm:pr-0">
                Wellcome back admin -{" "}
                <span className="font-bold text-lg pr-2">{user?.user?.name}</span>
              </div>
              <button
                onClick={logoutHandler}
                className=" px-3 py-1 rounded-md text-red-700 bg-red-200 font-medium"
              >
                Logout
              </button>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 flex">
              <Disclosure.Button>
                <a to="/admin_dashboard">
                  <a className=" text-white px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </a>
                </a>
                <a to="/v1/products">
                  <a className=" text-white px-3 py-2 rounded-md text-sm font-medium">
                    Products
                  </a>
                </a>
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar1;
