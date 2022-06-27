import React, { useContext, useEffect, useState } from "react";
import Navbar1 from "../Navbar1";
import Swal from "sweetalert2";
import { userContext } from "../../App";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setproductList] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    categoryId: "",
  });

  const handleProductValue = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addProductHandler = (e) => {
    e.preventDefault();
    const { name, description, categoryId } = product;

    if (!(name && description && categoryId)) {
      return toast.error("Fill all field");
    }
    const data = {
      name,
      description,
      categoryId,
    };
    try {
      fetch("https://stark-springs-97568.herokuapp.com/api/product/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("userToken")}`,
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
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserHandler = (id) => {
    fetch(
      `https://stark-springs-97568.herokuapp.com/api/delete_product/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    )
      .then((res) => res.text())
      .then((data) => {
        if (data) {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result) {
              const remainProduct = productList.filter(
                (product) => product._id !== id
              );
              setproductList(remainProduct);
            }
          });
        }
      });
  };

  useEffect(() => {
    fetch("https://stark-springs-97568.herokuapp.com/api/categorys", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategoryList(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("https://stark-springs-97568.herokuapp.com/api/products", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setproductList(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar1 />

      <div className="    md:px-6 md:ml-4   mt-20  ">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold pl-4">Products</h3>
          <div>
            <div>
              <button
                type="button"
                class=" text-dark ml-2 bg-blue-100 text-blue-900  hover:bg-gray-200  px-8 py-2 b rounded-md   font- cursor-pointer"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add
              </button>
              <div
                class="modal fade shadow-2xl fixed top-24 left-0 hidden w-8/12 mx-44 h-full outline-none overflow-x-hidden overflow-y-auto"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class=" modal-dialog relative w-auto pointer-events-none ">
                  <div class="px-40 py-28 pt-8 modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-gray-300 bg-clip-padding rounded-md outline-none text-current ">
                    <div class=" modal- flex flex-shrink-0 items-center justify-between   rounded-t-md">
                      <h5
                        class="font-semibold text-lg pl- "
                        id="exampleModalLabel"
                      >
                        Add Product
                      </h5>
                      <button
                        type="button"
                        class="btn-close box-content text-2xl font-semibold w-8 h-8 p-1 text-black "
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        x
                      </button>
                    </div>

                    <div className=" px-12 pt-20">
                      <div className="w-full">
                        <div>
                          <input
                            type="text"
                            name="name"
                            onChange={handleProductValue}
                            placeholder="Category name"
                            className="p-2 w-1/2 border border-gray-400 my-2 rounded "
                            required
                          />
                          <select
                            name="categoryId"
                            type="text"
                            onChange={handleProductValue}
                            className="p-2 w-1/2 border border-gray-400 my-2 rounded "
                            required
                          >
                            <option value="">---Select---</option>
                            {categoryList &&
                              categoryList.map((category, key) => (
                                <option value={category?._id}>
                                  {category?.name}
                                </option>
                              ))}
                          </select>
                          <textarea
                            type="text"
                            name="description"
                            onChange={handleProductValue}
                            placeholder="Description"
                            className="p-2 w-full border border-gray-400 my-2 rounded "
                            required
                          />
                        </div>
                      </div>

                      <div class=" flex flex-shrink-0 flex-wrap items-center justify-end pb-8 mt-10 ">
                        <button
                          onClick={addProductHandler}
                          type="submit"
                          class="px-6
                            py-2.5
                            bg-green-500
                            text-white
                            font-medium
                            text-xs
                            leading-tight
                            uppercase
                            rounded
                            shadow-md
                            
                            transition
                            duration-150
                            ease-in-out
                            ml-1"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-auto   pt- md:mb-   md:mt-0 md:pt-0 md p-2">
          <div className="overflow-x- max-h-screen  shadow-md sm:rounded-lg ">
            <table className="w-full  mx-2  text-sm text-left text-gray-500 dark:text-gray-400 md:mt-4 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-1 py-3">
                    Product id
                  </th>
                  <th scope="col" className="px-1 py-3">
                    Category id
                  </th>
                  <th scope="col" className="px-1 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-1 py-3">
                    Description
                  </th>

                  <th scope="col" className=" px-1 py-3 ">
                    <span className="">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
                    <div className="h-4 bg-gray-300 mb-6 rounded"></div>
                    <div className="h-4 bg-gray-200 mb-6 rounded"></div>
                    <div className="h-4 bg-gray-300 mb-6 rounded"></div>
                    <div className="h-4 bg-gray-200 mb-6 rounded"></div>
                  </div>
                ) : (
                  <>
                    {productList &&
                      productList.map((product, key) => (
                        <tr
                          key={key}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="px-1 py-3 font-normal text-gray-900 dark:text-white whitespace-nowrap"
                          >
                            {product && product._id}
                          </th>
                          <th
                            scope="row"
                            className="px-1 py-3 font-normal text-gray-900 dark:text-white whitespace-nowrap"
                          >
                            {product && product.categoryId}
                          </th>
                          <td className="px-1 py-3">
                            {" "}
                            {product && product.name}
                          </td>
                          <td className="px-1 py-3">
                            {" "}
                            {product && product.description}
                          </td>

                          <td className=" flex text-center pt-4">
                            <Link to={`/admin/product_update/${product._id}`}>
                              <button className="text-sm leading-none text-gray-600 py-2 px-3  rounded hover:bg-gray-200 focus:outline-none">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon cursor-pointer icon-tabler icon-tabler-edit"
                                  width={20}
                                  height={20}
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path stroke="none" d="M0 0h24v24H0z" />
                                  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                  <line x1={16} y1={5} x2={19} y2={8} />
                                </svg>
                              </button>
                            </Link>
                            <button
                              onClick={() =>
                                deleteUserHandler(product && product._id)
                              }
                              className="font-sm text-gray-600  hover:underline"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Products;
