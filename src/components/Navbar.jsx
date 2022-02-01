import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAtlassian } from "@fortawesome/free-brands-svg-icons";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex font-display text-teal-700 text-2xl md:text-3xl m-5 justify-between max-w-screen opacity-90 hover:opacity-100 transition-all duration-300 delay-50 ease-out">
        <a
          href="/"
          className="flex items-center space-x-4 cursor-pointer hover:scale-105 transition-all duration-300 delay-50 ease-out"
        >
          <button>
            <FontAwesomeIcon icon={faAtlassian} className="fa-lg" />
          </button>
          <p>ANIBU</p>
        </a>
        <div className="flex items-center justify-center right-5 top-5">
          <button onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon
              icon={faBars}
              className="fa-md hover:scale-110 transition-all duration-300 delay-50 ease-out"
            />
          </button>
        </div>
      </div>

      <div
        className={`flex flex-col fixed left-0 top-0 h-screen bg-teal-50 transition-all duration-500 delay-150 z-20 ${
          isOpen ? "w-full translate-x-0" : "w-0 -translate-x-40"
        } `}
      >
        <div className="flex w-full justify-end">
          <button
            className="mt-5 mr-5 text-teal-600 text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon
              icon={faTimes}
              className="fa-md hover:scale-110 transition-all duration-300 delay-50 ease-out"
            />
          </button>
        </div>
        <div className="my-5 mx-auto font-display text-teal-600 text-xl">
          <button onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faAtlassian} className="fa-3x" />
            <p>ANIBU</p>
          </button>
        </div>
        <div className="flex flex-col items-center text-teal-700 font-semibold">
          <div className="flex flex-col mt-5 space-y-3">
            <Link to="/anime" onClick={() => setIsOpen(!isOpen)}>
              Anime
            </Link>
            <Link to="/manga" onClick={() => setIsOpen(!isOpen)}>
              Manga
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
