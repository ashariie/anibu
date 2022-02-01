import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;

// {
//   /* <div className="h-screen">
//         <div className="scrollbar-thin lg:scrollbar-thumb-teal-400 h-full ">
//         </div>
//       </div> */
// }
