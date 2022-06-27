import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar1 from "../Navbar1";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const { id } = useParams();

  const [categoryList, setCategoryList] = useState([]);
  const [productInfo, setProductInfo] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const updateProductHandler = (e) => {
    e.preventDefault();
    const data = {
      name: name || productInfo.name,
      description: description || productInfo.description,
      categoryId: categoryId || productInfo.categoryId,
    };

    fetch(`http://localhost:4500/api/res/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((success) => {
        if (success) {
          Swal.fire("", "user Status updated successfully", "success");
          window.location.href = "/admin/products";
        }
      })
      .catch((error) => {
        Swal.fire("", "user Status not updated", error);
      });
  };

 
  useEffect(() => {
   
    fetch(`http://localhost:4500/api/product/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProductInfo(data));

        fetch("http://localhost:4500/api/categorys", {
         headers: {
           authorization: `Bearer ${localStorage.getItem("userToken")}`,
         },
       })
         .then((res) => res.json())
         .then((data) => {
           setCategoryList(data);
         });
  }, []);
 

  return (
    <div>
      <Navbar1 />
      <div className="mx-96  mt-40 shadow-lg p-10">
        <h3>Update Category</h3>
        <div className=" px-12 pt-10">
          <div className="w-full">
            <div>
              <input
                type="text"
                name="name"
                defaultValue={productInfo.name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Category name"
                className="p-2 w-1/2 border border-gray-400 my-2 rounded "
                required
              />
              <select
                name="categoryId"
                type="text"
                onChange={(e) => setCategoryId(e.target.value)}
                className="p-2 w-1/2 border border-gray-400 my-2 rounded "
                required
              >
                <option value="">---Select---</option>
                {categoryList &&
                  categoryList.map((category, key) => (
                    <option value={category?._id}>{category?.name}</option>
                  ))}
              </select>
              <textarea
                type="text"
                name="description"
                defaultValue={productInfo.description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="p-2 w-full border border-gray-400 my-2 rounded "
                required
              />
            </div>
          </div>

          <div class=" flex flex-shrink-0 flex-wrap items-center justify-end pb-8 mt-10 ">
            <button
              onClick={updateProductHandler}
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
  );
};

export default UpdateProduct;
