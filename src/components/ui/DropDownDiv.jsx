import React from "react";

function DropDownDiv({ children, isDropdownOpen }) {
  return (
    <div
      className={`${
        isDropdownOpen === false ? "hidden" : ""
      } absolute right-0.5 top-12 z-10 mt-2 w-64 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black/5 focus:outline-hidden py-1 overflow-y-auto`}
    >
      {children}
    </div>
  );
}

export default DropDownDiv;
