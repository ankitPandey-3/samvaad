import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../userContext";
import { Search } from "lucide-react";
import Card from "../Components/Card.jsx";
import axios from "axios";
import Chat from "../Components/Chat.jsx";
export function ChatPage() {
  const { username, user } = useContext(UserContext);
  const [contacts, setContacts] = useState([]);
  const [selectUserId, setSelectUserId] = useState(null);

  useEffect(() => {
    axios.get("/api/v1/auth/allContacts").then((response) => {
      const cards = response.data.data;
      // cards.forEach(card => {
      //     setContacts(cards);
      // });

      setContacts(cards);
    });
  }, []);

  return (
    <div className="flex bg-black justify-between h-screen">
      <div
        className="w-1/3 bg-gray-700 p-2 text-white rounded-xl m-2 flex flex-col   "
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
      <Chat setSelectUserId={setSelectUserId} selectUserId={selectUserId} />
    </div>
  );
}
