import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../userContext";
import { Search, Menu } from "lucide-react";
import Card from "../Components/Card.jsx";
import axios from "axios";
import Chat from "../Components/Chat.jsx";
import { Link } from "react-router-dom";
export function ChatPage() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [selectUserId, setSelectUserId] = useState(null);
  const [onClick, setOnClick] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setOnClick(true);
      setIsSmall(false)
    } else {
      setIsSmall(true);
      setOnClick(false);
    }
  }

  useState(
    ()=>{
      handleResize();
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, []
  );



  useEffect(() => {
    axios.get("/api/v1/auth/allContacts").then((response) => {
      const cards = response.data.data;
      // cards.forEach(card => {
      //     setContacts(cards);
      // });

      setContacts(cards);
    });
  }, []);



  if(!user) return (
  <div className="w-full h-screen flex justify-center items-center lg:text-3xl bg-gray-800 text-white p-4 text-xl">
    <h1>
      You need to <Link
      to={'/signin'} className="text-orange-500">
        Sign-In
      </Link>  first
    </h1>
  </div>)

  if(isSmall) return (
    <div className="flex bg-black justify-between h-screen">
      <Menu onClick={() => setOnClick(!onClick)} className="lg:hidden text-white fixed top-0 m-4"/>
      <div
        className={onClick ? "lg:w-1/3 bg-gray-700 p-2 text-white rounded-xl m-2 flex flex-col overflow-y-auto w-full" : "hidden"}
        style={{ backgroundColor: "#212A31" }}
      >
        <div className="flex p-2 mt-4">
          <input
            type="text"
            name="searchBar"
            id="searchBar"
            placeholder="Search"
            className="flex-grow border border-gray-400 p-2 bg-gray-800 text-white placeholder-white rounded-md "
          />
          <button className="p-2">
            <Search className="text-white" />
          </button>
        </div>
        <div className="p-4" onClick={()=>setOnClick(!onClick)}>
          {contacts.map(
            (tile, index) =>
              tile._id !== user._id && (
                <div className="" key={index}>
                  <Card
                    info={tile}
                    setSelectUserId={setSelectUserId}
                    selectUserId={selectUserId}
                  />
                </div>
              )
          )}
        </div>
      </div>
      <Chat setSelectUserId={setSelectUserId} selectUserId={selectUserId} onClick={onClick} setOnClick={setOnClick}/>
    </div>
  )

  return (
    <div className="flex bg-black justify-between h-screen">
      <div
        className="lg:w-1/3 bg-gray-700 p-2 text-white rounded-xl m-2 flex flex-col overflow-y-auto w-full"
        style={{ backgroundColor: "#212A31" }}
      >
        <div className="flex p-2">
          <input
            type="text"
            name="searchBar"
            id="searchBar"
            placeholder="Search"
            className="flex-grow border border-gray-400 p-2 bg-gray-800 text-white placeholder-white rounded-md "
          />
          <button className="p-2">
            <Search className="text-white" />
          </button>
        </div>
        <div className="p-4">
          {contacts.map(
            (tile, index) =>
              tile._id !== user._id && (
                <div className="" key={index}>
                  <Card
                    info={tile}
                    setSelectUserId={setSelectUserId}
                    selectUserId={selectUserId}
                  />
                </div>
              )
          )}
        </div>
      </div>
      <Chat setSelectUserId={setSelectUserId} selectUserId={selectUserId} onClick={onClick} setOnClick={setOnClick}/>
    </div>
  );
}
