// import React, { useContext, useEffect, useState } from "react";
// import { UserContext } from "../userContext";
// import { RotatingLines } from 'react-loader-spinner'
// import { Login } from './Login.jsx'
// import LoggedinHome from "./LoggedinHome";
// import { useNavigate } from "react-router-dom";
// import { NotLoggedInHome } from "./NotLoggedInHome.jsx";

// function Home() {
//   const navigate = useNavigate();
//   const { username, user } = useContext(UserContext);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSigned, setIsSigned] = useState(false)
//   useEffect(() => {
//     // Simulate loading delay (you can adjust the delay time as needed)
//     const delay = setTimeout(() => {
//       setIsLoading(false);
//     }, 3000);

    
//     // Cleanup function to clear the timeout if component unmounts or changes
//     return () => clearTimeout(delay);
//   }, []);

//   useEffect(
//     ()=>{
//       if(username) setIsSigned(true);
//       console.log(isSigned)
//       console.log(username)
//     },[user]
//   );
  

//   return (
//     <div>
//       {isLoading ? (
//         <div className="flex items-center justify-center h-screen bg-black">
//           <RotatingLines
//             visible={true}
//             height="96"
//             width="96"
//             color="orange"
//             strokeWidth="5"
//             animationDuration="0.75"
//             ariaLabel="rotating-lines-loading"
//             wrapperStyle={{}}
//             wrapperClass=""
//           />
//         </div>
//       ) : (
//             isSigned ? <NotLoggedInHome /> :  <LoggedinHome />  )}
//     </div>
//   );
// }

// export default Home;



import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../userContext";
import { RotatingLines } from 'react-loader-spinner'
import { Login } from './Login.jsx'
import LoggedinHome from "./LoggedinHome";
import { useNavigate } from "react-router-dom";
import { NotLoggedInHome } from "./NotLoggedInHome.jsx";

function Home() {
  const navigate = useNavigate();
  const { username, user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigned, setIsSigned] = useState(false)

  useEffect(() => {
    // Simulate loading delay (you can adjust the delay time as needed)
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Cleanup function to clear the timeout if component unmounts or changes
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    // Check if the user is signed in
    if (username) {
      setIsSigned(true);
    }
  }, [username]);

  // Render loading spinner while loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="orange"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  // Render appropriate content based on sign-in status
  return (
    <div>
      {isSigned ? <LoggedinHome /> : <NotLoggedInHome />}
    </div>
  );
}

export default Home;
