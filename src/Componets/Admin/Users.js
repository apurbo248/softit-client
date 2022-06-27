import React, { useContext, useEffect, useState } from "react";
import Navbar1 from "../Navbar1";
import Swal from "sweetalert2";
import { userContext } from "../../App";
import { Link } from "react-router-dom";
const Users = () => {
  const [userList, setUserList] = useState({});
  const [keyword, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useContext(userContext);
  const userEmail = user?.user?.email;

  const response = async () => {
    await fetch(
      `https://stark-springs-97568.herokuapp.com/api/users?keyword=${keyword}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUserList(data);
        setLoading(false);
        console.log(data);
      });
  };

  const deleteUserHandler = (id) => {
    fetch(`https://stark-springs-97568.herokuapp.com/api/delete_user/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
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
              const remainUser = userList.filter((user) => user._id !== id);
              setUserList(remainUser);
            }
          });
        }
      });
  };

  const userRoleChange = (id, role) => {
    let modifiedRole = [];
    userList.forEach((user) => {
      if (user._id === id) {
        user.role = role;
      }
      modifiedRole.push(user);
    });

    const modifiedRoles = { id, role };

    fetch(
      `https://stark-springs-97568.herokuapp.com/api/update_user_info/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(modifiedRoles),
      }
    )
      .then((response) => response.json())
      .then((success) => {
        if (success) {
          Swal.fire("", "user Status updated successfully", "success");
          window.location.reload();
        }
      })
      .catch((error) => {
        Swal.fire("", "user Status not updated", error);
      });
  };

  useEffect(() => {
    response();
  }, []);
  return (
    <div>
      <Navbar1 />

      <div className="    md:px-6 md:ml-4   pt-20  ">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold pl-4">Users</h3>
          <div className="pr-4">
            <input
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Name/Phone number"
              className="p-2 border rounded-full"
            />
            <button
              onClick={response}
              className="bg-green-500 text-white px-4 -ml-8 rounded-full py-2 font-medium"
            >
              Filter
            </button>
          </div>
        </div>
        <div className="overflow-auto   pt- md:mb-   md:mt-0 md:pt-0 md p-2">
          <div className="overflow-x- max-h-screen  shadow-md sm:rounded-lg ">
            <table className="w-full  px-4  text-sm text-left text-gray-500 dark:text-gray-400 md:mt-4 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-1 py-3">
                    User id
                  </th>
                  <th scope="col" className="px-1 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-1 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-1 py-3">
                    Password
                  </th>
                  <th scope="col" className="px-1 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-1 py-3 ">
                    Role
                  </th>
                  <th scope="col" className="px-1 py-3">
                    Image
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
                    {userList &&
                      userList.map((user, key) => (
                        <tr
                          key={key}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="px-1 py-3 font-normal text-gray-900 dark:text-white whitespace-nowrap"
                          >
                            {user && user._id}
                          </th>
                          <td className="px-1 py-3"> {user && user.name}</td>
                          <td className="px-1 py-3"> {user && user.email}</td>
                          <td className="px-1 py-3  ">
                            <h2 class="title-font font-medium text-white tracking-widest text- mb-6"></h2>
                            <h3 className=" truncate w-28 ">
                              {user && user.password}
                            </h3>
                          </td>
                          <td className="px-1 py-3"> {user && user.phone}</td>
                          <td className="px-1 py-3 text-center text-uppercase">
                            <p
                              className={
                                user && user.role === "admin"
                                  ? "p-1 rounded bg-green-100 text-green-700 text-md"
                                  : "p-1 rounded bg-yellow-100 text-yellow-700 text-md"
                              }
                            >
                              {userEmail === user.email ? (
                                <h3 className="border border-green-500">
                                  admin
                                </h3>
                              ) : (
                                <select
                                  className={
                                    user && user.role === "admin"
                                      ? "bg-green-100"
                                      : "bg-yellow-100"
                                  }
                                  onChange={(e) =>
                                    userRoleChange(user._id, e.target.value)
                                  }
                                >
                                  <option
                                    className="text-muted"
                                    value={user.role}
                                  >
                                    {user.role}
                                  </option>
                                  <option
                                    className="text-muted"
                                    value={
                                      user && user.role === "admin"
                                        ? "user"
                                        : "admin"
                                    }
                                  >
                                    {user && user.role === "admin"
                                      ? "user"
                                      : "admin"}
                                  </option>
                                </select>
                              )}
                            </p>
                          </td>
                          <td className="px- py-">
                            {" "}
                            <img
                              src={user.avatar}
                              alt="No image "
                              className="h-10 "
                            />{" "}
                          </td>
                          <td className=" flex text-center pt-4">
                            <Link to={`/admin/user_update/${user._id}`}>
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
                            {user?.email === "admin" ? (
                              ""
                            ) : (
                              <button
                                onClick={() =>
                                  deleteUserHandler(user && user._id)
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
                            )}
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
    </div>
  );
};

export default Users;
