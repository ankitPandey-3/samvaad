import React from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { LogInIcon, } from "lucide-react";

export function NotLoggedInHome() {
  return (
    <div
      className="bg-black h-screen text-white flex justify-center items-center"
      style={{
        background:
          "rgb(2,0,36) linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 50%, rgba(160,202,210,1) 100%)",
      }}
    >
      <div className="lg:w-1/2 lg:h-4/5 bg-gray-900 lg:rounded-3xl w-full h-full flex justify-center items-center">
        <div className="w-1/4 bg-white text-black text-center p-4 hover:bg-gray-700 hover:text-white text-2xl font-serif rounded-lg mr-9">
        <NavLink
          to="/signin"
          className={({ isActive }) =>
            `w-full py-2 pr-4 pl-3 duration-200 border-b${isActive ? "text-black" : "text-gray-700"} hover:bg-gray-50 lg:hover:bg-transparent hover:text-white lg:p-0`
          }
        >
          Sign-In
        </NavLink>
        </div>

        <div className="w-1/4 bg-white text-black text-center p-4 hover:bg-gray-700 hover:text-white text-2xl font-serif rounded-lg ml-9">
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            `w-full py-2 pr-4 pl-3 duration-200 border-b${isActive ? "text-black" : "text-gray-700"} hover:bg-gray-50 lg:hover:bg-transparent hover:text-white lg:p-0`
          }
        >
          Sign-Up
        </NavLink>
        </div>

        

      </div>
    </div>
  );
};