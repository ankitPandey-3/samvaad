import { Headers } from "./Components/Header";
import Footer from "./Components/Footer";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { UserContextProvider } from "./userContext.jsx";

function App() {
  axios.defaults.baseURL = "http://localhost:4040";
  axios.defaults.withCredentials = true;

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
