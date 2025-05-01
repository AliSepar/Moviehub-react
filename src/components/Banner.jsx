import React, { useEffect, useState } from "react";
import axios from "../axios/axios.js";
import requests from "../axios/requests.js";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * (request.data.results.length - 1))
        ]
      );
    };
    fetchData();
  }, []);

  function truncate(str, n) {
    // will mak it short
    if (!str) return "";
    return str.length > n ? str.slice(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner text-white object-fit-contain h-[448px] relative"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__content ml-8 pt-[140px] h-[190px]">
        <h1 className="text-[3rem] font-extrabold pb-[0.3rem]">
          {movie?.name || movie?.title || movie?.original_name}
        </h1>
        <div className="banner__button pb-1 flex items-center">
          <button className="banner__button cursor-pointer text-white outline-none border-none font-bold rounded-[0.2vw] px-8 mr-4 py-2 bg-[rgba(51,51,51,0.5)] hover:bg-[#e6e6e6] hover:text-black transition duration-120">
            Play
          </button>
          <button className="banner__button cursor-pointer text-white outline-none border-none font-bold rounded-[0.2vw] px-8 mr-4 py-2 bg-[rgba(51,51,51,0.5)] hover:bg-[#e6e6e6] hover:text-black transition duration-120">
            My List
          </button>
          <p className="text-md self-baseline-last">
            IMDB:
            <b>
              {movie?.vote_average && Math.floor(movie?.vote_average * 10) / 10}
            </b>
          </p>
        </div>
        <h1 className="w-[45rem] leading-5 max-w-[360px] h-[80px] tracking-wide">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="h-[8rem] w-full bg-gradient-to-b from-transparent via-[rgba(37,37,37,0.61)] to-[#111] absolute bottom-0 left-0 z-10"></div>
    </header>
  );
}

export default Banner;
