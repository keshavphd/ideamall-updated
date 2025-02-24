import React from "react";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { SiRelianceindustrieslimited } from "react-icons/si";
import { SiMahindra } from "react-icons/si";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bottom-0 z-10 w-full mt-1">
      <div className="container w-full mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between bg-cyan-100 gap-1.5">
        <p>© All Rights Reserved</p>
        <div className="flex items-center justify-center gap-2">
          <Link to="" className="hover:text-yellow-300">
            <FaFacebook />
          </Link>
          <Link to="" className="hover:text-yellow-300">
            <FaSquareInstagram />
          </Link>
          <Link to="" className="hover:text-yellow-300">
            <IoLogoTwitter />
          </Link>
          <Link to="" className="hover:text-yellow-300">
            <SiRelianceindustrieslimited />
          </Link>
          <Link to="" className="hover:text-yellow-300">
            <SiMahindra />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
