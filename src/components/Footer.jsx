import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="relative mx-5">
      <div className="footer flex w-full rounded-lg bg-teal-400 p-5 justify-between text-teal-50 items-center font-display text-sm md:text-md text">
        <p>Anibu Copyright</p>
        <div className="flex space-x-2 ">
          <FontAwesomeIcon
            icon={faFacebookSquare}
            className="fa-2x hover:text-teal-700"
          />
          <FontAwesomeIcon
            icon={faTwitterSquare}
            className="fa-2x hover:text-teal-700"
          />
          <FontAwesomeIcon
            icon={faInstagramSquare}
            className="fa-2x hover:text-teal-700"
          />
        </div>
        <p>info@anibu.com</p>
      </div>
    </div>
  );
};

export default Footer;
