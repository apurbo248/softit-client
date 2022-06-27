import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar1 from "../Navbar1";
import Swal from "sweetalert2";

const UpdateCategory = () => {
  const { id } = useParams();
  console.log(id);
  const [category, setCategory] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const updateCategoryHandler = (e) => {
    e.preventDefault();
    const data = {
      name: name || category.name,
      description: description || category.description,
    };

    fetch(
      `https://stark-springs-97568.herokuapp.com/api/update_category_info/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((success) => {
        if (success) {
          Swal.fire("", "user Status updated successfully", "success");
          //  window.location.href = "/admin/categories";
        }
      })
      .catch((error) => {
        Swal.fire("", "user Status not updated", error);
      });
  };

  useEffect(() => {
    fetch(`https://stark-springs-97568.herokuapp.com/api/category/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, []);
  return (
    <div>
      <Navbar1 />
      <div className="mx-96  mt-40 shadow p-10">
        <h3>Update Category</h3>
        <div>
          <input
            name="name"
            type="text"
            defaultValue={category.name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="p-2 w-full border  my-4"
            required
          />
          <textarea
            name="description"
            type="text"
            defaultValue={category.description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="p-2 w-full border  "
            required
          />
        </div>

        <button
          onClick={updateCategoryHandler}
          className="bg-red-500 my-4 focus:text-white py-1 px-4 border-2 focus:border-0"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateCategory;
