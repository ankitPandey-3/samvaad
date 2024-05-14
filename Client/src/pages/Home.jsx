import React, { useContext, useEffect } from "react";
import { UserContext } from "../userContext";
import { Video, MessagesSquare, LogOut, LogOutIcon } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const { username, user } = useContext(UserContext);
  useEffect(() => {
    console.log(user)
    if (!username) navigate("/signin");
  }, [user]);
  const handleLogout = async () => {
    const { data } = await axios.post("/api/v1/auth/sign-out", {});
    if (data.success) navigate("/signin");
  };
  return (
    <div
      className="bg-black h-screen text-white flex justify-center items-center"
      style={{
        background:
          "rgb(2,0,36) linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 50%, rgba(160,202,210,1) 100%)",
      }}
    >
      <div className="lg:w-1/2 lg:h-4/5 bg-gray-900 lg:rounded-3xl w-full h-full">
        <div
          className="w-fit text-center p-8 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700 cursor-pointer rounded-full"
          onClick={handleLogout}
        >
          <Link>
            <LogOut />
          </Link>
        </div>
        <div className="w-full h-1/2 flex justify-center">
          <img
            src={user.profileImage}
            alt="User Image"
            className="rounded-full mt-2"
          />
        </div>
        <div className="text-4xl text-center font-serif">
          <h1>{user.fullName}</h1>
        </div>
        <div className="text-white p-4 m-9 flex justify-between">
          <Link to="/#" className="w-1/3 h-1/2">
            <Video className="w-1/2 h-1/2" />
          </Link>
          <Link to="/chat" className="w-1/3 h-1/2 p-4 ">
            <MessagesSquare className="w-1/2 h-1/2" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
