import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./userContext.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Login } from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import { ChatPage } from "./pages/ChatPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={<ChatPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
