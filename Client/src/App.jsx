import axios from "axios";
import { Outlet } from "react-router-dom";

function App() {
  axios.defaults.baseURL = "https://samvaad-api.onrender.com";
  axios.defaults.withCredentials = true;

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
