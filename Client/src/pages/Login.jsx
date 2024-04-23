import React, { useState } from "react";

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async () => { };
  return (
      <div className="lg:w-2/3 flex justify-end py-8 w-full">
      <div className="lg:w-2/5 lg:h-5/6 py-20 px-14  mt-20 border border-gray-300 rounded-md bg-white w-full h-full">
        <form onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold mb-7 mr-4 font-serif md:text-4xl md:mr-8 text-center text-gray-900">Samvaad</h1>
          <h1 className="text-3xl font-semibold mb-9 mr-4 text-gray-900 text-center">Sign in</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-md">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-md">Password:</label>
            <input
              type="text"
              name="password"
              id="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-indigo-700 hover:bg-indigo-900 text-white font-semibold rounded-md py-2 px-4 w-full mt-4">
            Sign in
          </button>
        </form>
        <div className="mt-2 text-darkblue-600 text-center">
          <a href="/signup" className="hover:underline">
            Don't have an account yet?
          </a>
        </div>
      </div>
    </div>
    
    
  );
}
