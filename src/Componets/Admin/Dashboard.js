import React from "react";
import Navbar1 from "../Navbar1";

const Dashboard = () => {
  return (
    <div>
      <Navbar1 />

      <div className="flex justify-center shadow-2xl mx-44 my-36 p-40">
        <h3 className="text-3xl font-bold"> Wellcome to Admin Panel</h3>
      </div>
    </div>
  );
};

export default Dashboard;
