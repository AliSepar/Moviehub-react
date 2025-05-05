import React, { useEffect, useState } from "react";
import { IoSearchCircleOutline } from "react-icons/io5";
import DropDownDiv from "./ui/DropDownDiv";
import axios from "../axios/axios";
import conf from "../config/config";

function Navbar() {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  console.log(searchResult);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput.trim() === "") {
        setIsDropDownOpen(false);
        setSearchResult([]);
        return;
      }
      const fetchData = async () => {
        let fetchUlr = `/search/movie?query=${searchInput}&api_key=${conf.tmdbApiKey}`;
        const request = await axios.get(fetchUlr);

        // to sort by data and show the latest first
        const sortedResults = request.data.results.sort((a, b) => {
          return new Date(b.release_date) - new Date(a.release_date);
        });
        setSearchResult(sortedResults);

        // setSearchResult(request.data.results);

        if (request.data.results && request.data.results.length > 0) {
          setIsDropDownOpen(true);
        } else {
          setIsDropDownOpen(false);
        }
      };
      fetchData(); // <- ✅ this was missing
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  // const handleSearch = (e) => {
  //   e.preventDefault();
  // };
  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/40 flex items-center justify-between px-4 py-2">
      <img
        src="https://png.pngtree.com/element_our/20190603/ourmid/pngtree-movie-board-icon-image_1455346.jpg"
        className="w-10 h-10 rounded-md"
        alt="logo"
      />

      <div className="flex items-center gap-2 border-2 transition-all duration-100 focus-within:border-white border-transparent w-70 rounded-md pr-1">
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder="Search Movies..."
          className="px-3 py-1 rounded  text-white placeholder-gray-400 outline-none w-full"
        />
        <button
          className="text-white text-2xl cursor-pointer"
          onClick={() => setIsDropDownOpen(!isDropdownOpen)}
        >
          <IoSearchCircleOutline />
        </button>

        {/* dropdown-start */}
        <DropDownDiv isDropdownOpen={isDropdownOpen}>
          {searchResult.map((movie) => (
            <a
              key={movie.id}
              href="#"
              className="flex items-start gap-3 px-4 py-2 text-sm text-gray-100 transition duration-100 border-b border-gray-700 hover:bg-gray-800"
              id="menu-item"
            >
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt="Movie Poster"
                className="w-16 h-16 object-cover rounded"
              />

              <div className="flex flex-col">
                <span className="font-medium">{movie.original_title}</span>
                <span className="text-xs text-gray-400">
                  ⭐ {movie.vote_average}/10
                </span>
              </div>
            </a>
          ))}
        </DropDownDiv>
        {/* dropdown-end */}
      </div>
    </div>

    // dropdown
  );
}

export default Navbar;
