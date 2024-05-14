import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import axios from 'axios';

//Signup jsx function
export function Signup() {
  //navigator
  const navigate = useNavigate();

  //states
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/auth/sign-up', {fullName, username, email, password});
      if(data.success) navigate('/signin');
    } catch (error) {
        console.log('Error occured ', error.respose.data);
    }
  };
  return (
    // <div className="bg-gray-100 flex justify-center items-center h-screen">
    //   {/* Left: Image */}
    //   <div className="w-1/2 h-screen hidden lg:flex justify-center items-center bg-yellow-500">
    //     <img
    //       src="\image-modified.png"
    //       alt="Placeholder Image"
    //       className="object w-auto h-auto"
    //     />
    //   </div>
    //   {/* Right: sign up Form */}
    //   <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
    //     <h1 className="text-3xl font-bold mb-4 mr-4 font-serif md:text-4xl md:mr-8">
    //       Samvaad
    //     </h1>
    //     <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
    //     <form onSubmit={handleSubmit}>
          // <div className="mb-4">
          //   <label htmlFor="fullName" className="block text-gray-700 text-md">
          //     Full Name:
          //   </label>
          //   <input
          //     type="text"
          //     name="fullName"
          //     id="fullName"
          //     placeholder="Full Name"
          //     className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
          //     value={fullName}
          //     onChange={(e) => setFullName(e.target.value)}
          //   />
          // </div>
          // <div className="mb-4">
          //   <label htmlFor="username" className="block text-gray-700 text-md">
          //     Username:
          //   </label>
          //   <input
          //     type="text"
          //     name="username"
          //     id="username"
          //     placeholder="username"
          //     className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
          //     value={username}
          //     onChange={(e) => setUsername(e.target.value)}
          //   />
          // </div>
    //       <div className="mb-4">
    //         <label htmlFor="email" className="block text-gray-700 text-md">
    //           Email:
    //         </label>
    //         <input
    //           type="text"
    //           name="email"
    //           id="email"
    //           placeholder="example@example.com"
    //           className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label htmlFor="email" className="block text-gray-700 text-md">
    //           Password:
    //         </label>
    //         <input
    //           type="text"
    //           name="password"
    //           id="password"
    //           placeholder="password"
    //           className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </div>
    //       <button
    //         type="submit"
    //         className="bg-orange-700 hover:bg-red-500 text-white font-semibold rounded-md py-2 px-4 w-full mt-4"
    //       >
    //         Sign up
    //       </button>
    //     </form>
    //     <div className="mt-2 text-orange-600 text-center">
    //       <Link to="/signin" className="hover:underline">
    //         Already have an account?
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div className=" bg-gray-900 flex justify-center items-center h-screen">
      <div className="bg-gray-500 w-1/3 h-auto p-2 bg-opacity-20 rounded-2xl">
        <div className="text-white text-center text-3xl font-serif mt-2">Sign-up</div>
        <div className="text-white flex justify-center">
        <CircleUserRound className="w-1/3 h-1/3"/>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col p-2">
        <div className="m-2">
            <label htmlFor="fullName" className="block text-white text-md">
              Full Name:
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="m-2">
            <label htmlFor="username" className="block text-white text-md">
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        <div className="m-2">
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
           <div className="m-2">
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
             <button type="submit" className="bg-gray-700 hover:bg-gray-500 text-white font-semibold rounded-md py-2 px-4 w-full mt-4">
             Sign in
           </button>
           </div>
        </form>
        <div className=" text-white text-center mb-2">
         <Link
           to='/signin'
           className="hover:underline">
             Already have an account?
         </Link>
        </div>
      </div>

    </div>
  );
}
