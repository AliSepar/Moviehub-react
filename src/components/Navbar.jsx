import React from "react";
import { IoSearchCircleOutline } from "react-icons/io5";

function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/40 flex items-center justify-between px-4 py-2">
      <img
        src="https://png.pngtree.com/element_our/20190603/ourmid/pngtree-movie-board-icon-image_1455346.jpg"
        className="w-10 h-10 rounded-md"
        alt="logo"
      />

      <div className="flex items-center gap-2 border-2 transition-all duration-100 focus-within:border-white border-transparent w-70 rounded-md pr-1">
        <input
          type="text"
          placeholder="Search Movies..."
          className="px-3 py-1 rounded  text-white placeholder-gray-400 outline-none w-full"
        />
        <button className="text-white text-2xl cursor-pointer">
          <IoSearchCircleOutline />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
