import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar1 from "../Navbar1";
import Swal from "sweetalert2";
import axios from "axios";
import visa from "../image/visa.png";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const uploadImage = async (e) => {
    setImageLoading(true);
    const imageData = new FormData();
    imageData.set("key", "c9e7c4b6f1a9856f03990d5024785ae5");
    imageData.append("image", e.target.files[0]);

    await axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImage(response.data.data.display_url);
        setImageLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(image);
  const updateUserHandler = (e) => {
    e.preventDefault();
    const data = {
      name: name || user.name,
      email: email || user.email,
      password: password || user.password,
      avatar: image || user.avatar,
      phone: phone || user.phone,
    };

    fetch(
      `https://stark-springs-97568.herokuapp.com/api/update_user_info/${id}`,
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
          Swal.fire("", "user info updated successfully", "success");
          window.location.href = "/admin/users";
        }
      })
      .catch((error) => {
        Swal.fire("", "user info not updated", error);
      });
  };

  useEffect(() => {
    fetch(`https://stark-springs-97568.herokuapp.com/api/user/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <div>
      <Navbar1 />
      <div className="mx-96  mt-28 shadow-lg p-10">
        <h3>Update User Info</h3>
        <div className=" px-12 pt-4">
          <div className="w-full">
            <div className="">
              <div>
                {image ? (
                  <>
                    {imageLoading ? (
                      <div class=" items-center justify-center">
                        <button
                          type="button"
                          class="flex items-center rounded-lg bg-green px-4 py-2 text-green-800"
                          disabled
                        >
                          <svg
                            class="mr-3 h-5 w-5 animate-spin text-green-800"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              class="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              class="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span class="font-medium text-mainBaseColor">
                            {" "}
                            Take a deep breath... &#127804;
                          </span>
                        </button>
                      </div>
                    ) : (
                      <div class="rounded-xl overflow-hidden    shadow-md  bg-white cursor-pointer h-20 flex justify-center">
                        <div class="  w-24 p-1">
                          <img
                            alt="You will see your choosed pictures here"
                            src={image && image}
                            class="rounded-xl object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    )}{" "}
                  </>
                ) : (
                  <div class="rounded-xl overflow-hidden flex shadow hover:shadow-md max-w-full bg-white cursor-pointer h-28">
                    <div class="w-2/2  text-text1  justify-center"></div>

                    <div class="lg:  w-full p-1 flex justify-center">
                      <img
                        alt="No image found"
                        src={user.avatar}
                        class="rounded-xl object-cover w-24 h-full"
                      />
                    </div>
                  </div>
                )}
              </div>
              <input
                type="text"
                defaultValue={user.name}
                onChange={(e) => setName(e.target.value)}
                placeholder=" name"
                className="p-2 w-1/2 border border-gray-400 my-2 rounded "
                required
              />
              <input
                type="text"
                defaultValue={user.email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email "
                className="p-2 w-1/2 -mr-4 border border-gray-400 my-2 rounded "
                required
              />
              <input
                type="text"
                defaultValue={user.password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password "
                className="p-2 w-1/2 border border-gray-400 my-2 rounded "
                required
              />
              <input
                type="text"
                defaultValue={user.phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone no "
                className="p-2 w-1/2 border border-gray-400 my-2 rounded "
                required
              />
              <input
                type="file"
                name="image"
                onChange={uploadImage}
                className="p-2 w-full border border-gray-400 my-2 rounded "
                required
              />
            </div>
          </div>

          <div class=" flex flex-shrink-0 flex-wrap items-center justify-end pb-8 mt-10 ">
            <button
              onClick={updateUserHandler}
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
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
