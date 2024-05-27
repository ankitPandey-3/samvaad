import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleUserRound } from 'lucide-react'
import { useAuth } from "../userContext";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();


  //submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/auth/sign-in', {email, password})
      if(data.success){
        setUser(data.data.user)
        navigate('/');
      }
    } catch (error) {
      console.log('error occured', error.response.data)
    }
   };



  return (
    <div className=" bg-gray-900 flex justify-center items-center h-screen">
      <div className="bg-gray-500 lg:w-1/3 lg:h-auto p-2 bg-opacity-20 rounded-2xl w-full h-full">
        <div className="text-white text-center text-3xl font-serif m-2">Sign-in</div>
        <div className="text-white flex justify-center mt-10">
        <CircleUserRound className="w-1/3 h-1/3"/>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col mt-9">
        <div className="m-4">
             <label htmlFor="email" className="block text-white">
               E-mail
             </label>
             <input
               type="text"
               id="email"
               name="email"
               className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
               autoComplete="off"
               value={email}
               placeholder='example@example.com'
               onChange={(e) => setEmail(e.target.value)}
             />
           </div>
           <div className="m-4">
             <label htmlFor="password" className="block text-white">
               Password
             </label>
             <input
               type="password"
               id="password"
               name="password"
               className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
               autoComplete="off"
               value={password}
               placeholder='********'
               onChange={(e) => setPassword(e.target.value)}
             />
             <button type="submit" className="bg-gray-700 hover:bg-gray-500 text-white font-semibold rounded-md py-2 px-4 w-full mt-10">
             Sign in
           </button>
           </div>
        </form>
        <div className=" text-white text-center">
         <Link
           to='/signup'
           className="hover:underline">
             Don't have an account?
         </Link>
        </div>
      </div>

    </div>
  );
}
