import React, { useEffect, useState } from "react";
import { useAuth } from "../userContext";
import { ArrowLeft, SendHorizonal } from "lucide-react";
import { Link } from "react-router-dom";
import axios, { all } from "axios";
import { Message } from "./Message.jsx";
import io from 'socket.io-client'


const ENDPOINT = "/"; //Deployed URL at the time of deploying
var socket, selectedChatCompare;

function Chat({ setSelectUserId, selectUserId, onClick, setOnClick }) {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [message, setMessage] = useState([]);
  const [chat, setChat] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setIsSmallScreen(false);
    } else {
      setIsSmallScreen(true);
    }
  }

  useState(
    ()=>{
      handleResize();
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, []
  );


  const handleSendMessage = async(e)=>{
    e.preventDefault();
    socket.emit('stop typing', chat._id)
    const formData = {
      content: newMessage,
      chatId: chat._id
    };
    console.log(formData);
    const { data } = await axios.post('/api/v1/message/', formData);

    socket.emit('new message', data.data);
    setMessage([...message, data.data]);
    setNewMessage('');
  }
  

  useEffect(
    ()=>{
      socket = io(ENDPOINT);
      socket.emit('setup', user);
      socket.on('connected', ()=>{setSocketConnected(true)})
      socket.on('typing', ()=> setIsTyping(true));
      socket.on('stop typing', ()=> setIsTyping(false));
    },[])


useEffect(
  ()=>{
    if(selectUserId)
      {
        axios.post('/api/v1/chat/',{userId: selectUserId})
          .then((response)=>{
            const { data } = response;
            setChat(data);
            fetchMessages(data);
            selectedChatCompare = data;
          })
      }
  },[selectUserId]
);

useEffect(
  () => {
    socket.on('message received', (newMessageReceived) => {
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id)
        {
          // give notification
        } else{
          setMessage([...message, newMessageReceived])
        }
    });
  }
);


  const fetchMessages = async(room)=>{
    try {
      const { data } = await axios.get(`/api/v1/message/${room._id}`)
      let allMessages = data.data;
      setMessage(allMessages)

      socket.emit('join chat', room._id)
    } catch (error) {
      console.log(error)
    }
  }

  // const typingHandler = (e)=>{
  //   setNewMessage(e.target.value);

  //   if(!socketConnected) return;

  //   if(!typing){
  //     setTyping(true);
  //     socket.emit('typing', chat._id);
  //   }
  //   let lastTypingTime = new Date().getTime()
  //   var timerLength = 3000;
  //   setTimeout(()=>{
  //     var timeNow = new Date().getTime();
  //     var timeDiff = timeNow - lastTypingTime;

  //     if(timeDiff >= timerLength && typing){
  //       socket.emit('stop typing', chat._id);
  //       setTyping(false);
  //     }
  //   }, timerLength)

  // }

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  
    if (!socketConnected) return;
  
    if (!typing) {
      setTyping(true);
      socket.emit('typing', chat._id);
    }
    
    // Reset the typing timer
    clearTimeout(typingTimeout);
  
    typingTimeout = setTimeout(() => {
      setTyping(false);
      socket.emit('stop typing', chat._id);
    }, 3000);
  };
  

  const handleLeaveRoom = (e)=>{
    socket.disconnect();
  }

  const createChatRoom = async()=>{
    const{ data } = await axios.post('/api/v1/chat/',{userId: selectUserId})
    // console.log(data._id);
    return data
  }
  console.log(isSmallScreen)

  if (!selectUserId)
    if(isSmallScreen){
      return(
        <div className={!onClick ? "flex lg:w-2/3 bg-gray-500 p-2 text-gray-400 rounded-xl m-2 text-3xl justify-center items-center font-sans w-full" : "hidden"}>
        <ArrowLeft /> Please Select a Person From Sidebar
      </div>
      )
    }
    else
    return (
      <div className="flex lg:w-2/3 bg-gray-500 p-2 text-gray-400 rounded-xl m-2 text-3xl justify-center items-center font-sans w-full">
        <ArrowLeft /> Please Select a Person From Sidebar
      </div>
    );
  else
  if(isSmallScreen){
    return (
      <div
        className={!onClick ? "flex flex-col lg:w-2/3 bg-gray-700 p-2 text-white rounded-xl m-2 w-full" : "hidden"}
        style={{ backgroundColor: "#748D92" }}
      >
        <div className="flex-grow" onClick={handleLeaveRoom}>
          <Link to="/">
            <div className="flex justify-end">
              <img className="w-1/12" src={user.profileImage} alt="" />
            </div>
          </Link>
        </div>
        <Message messages={message} currentUserId={user._id} />
        <form onSubmit={handleSendMessage}>
          {/* {isTyping ? <div>Loading...</div>:(<></>)} */}
        <div className="flex p-2">
        <input
            type="text"
            placeholder="Type your message here"
            className="flex-grow border border-gray-400 p-4 bg-gray-800 text-white placeholder-white rounded-3xl"
            value={newMessage}
            onChange={typingHandler}
          />
          <button className="p-4" type="submit">
            <SendHorizonal className="text-white" />
          </button>
        </div>
        </form>
      </div>
    );
  } else
    return (
      <div
        className="flex flex-col lg:w-2/3 bg-gray-700 p-2 text-white rounded-xl m-2 w-full"
        style={{ backgroundColor: "#748D92" }}
      >
        <div className="flex-grow" onClick={handleLeaveRoom}>
          <Link to="/">
            <div className="flex justify-end">
              <img className="w-1/12" src={user.profileImage} alt="" />
            </div>
          </Link>
        </div>
        <Message messages={message} currentUserId={user._id} />
        <form onSubmit={handleSendMessage}>
          {/* {isTyping ? <div>Loading...</div>:(<></>)} */}
        <div className="flex p-2">
        <input
            type="text"
            placeholder="Type your message here"
            className="flex-grow border border-gray-400 p-4 bg-gray-800 text-white placeholder-white rounded-3xl"
            value={newMessage}
            onChange={typingHandler}
          />
          <button className="p-4" type="submit">
            <SendHorizonal className="text-white" />
          </button>
        </div>
        </form>
      </div>
    );
}

export default Chat;
