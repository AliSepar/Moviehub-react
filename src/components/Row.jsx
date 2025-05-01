import YouTube from "react-youtube";
import axios from "../axios/axios.js"; // rename the instince variable to axios
import React, { useState, useEffect } from "react";
import movieTrailer from "movie-trailer";
import conf from "../config/config.js";

function Row({ title, fetchUlr, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUlr);
      setMovies(request.data.results);
      //   console.log(request);
      //   return request;
    };

    fetchData();
  }, [fetchUlr]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoPlay: 1,
    },
  };

  async function getMediaTypeById(id, title) {
    const searchUrl = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
      title
    )}&api_key=${conf.tmdbApiKey}`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    const matched = data.results.find((item) => item.id === id);
    if (matched) {
      return matched.media_type; // "movie" or "tv"
    } else {
      return "not_found";
    }
  }

  const handleClick = async (movie) => {
    // if (trailerUrl !== "") {
    //   setTrailerUrl("");
    // } else {
    //   movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
    //     .then((url) => {
    //       // https://www.youtube.com/watch?v=XtMThy8QKqU to get the movie id
    //       const urlParams = new URLSearchParams(new URL(url).search);
    //       setTrailerUrl(urlParams.get("v"));
    //       // TODO: you can simplify it with another api request which has the video id
    //     })
    //     .catch((error) => console.log("Trailer not found", error));
    // }

    if (trailerUrl !== "") {
      setTrailerUrl("");
    } else {
      const mediaType = await getMediaTypeById(
        movie.id,
        movie.name || movie.title || movie.original_name
      ); // 👈 Await it

      if (!mediaType) {
        console.error("Media type not found");
        return;
      }

      const res = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${movie.id}/videos?api_key=${conf.tmdbApiKey}`
      );
      const data = await res.json();

      console.log("API results:", data.results);

      const videos = data?.results || [];

      const trailers = videos.filter(
        (vid) =>
          vid.type?.toLowerCase() === "trailer" &&
          vid.site?.toLowerCase() === "youtube"
      );

      // Try to prioritize 'official' trailers, fallback to any trailer
      const officialTrailer = trailers.find((vid) =>
        vid.name?.toLowerCase().includes("official")
      );

      const selectedTrailer = officialTrailer || trailers[0];

      if (!selectedTrailer) {
        console.warn("No suitable trailer found", { trailers, videos });
        return;
      }

      setTrailerUrl(selectedTrailer.key);
    }
  };

  //www.youtube.com/watch?v=XtMThy8QKqU&list=PL-J2q3Ga50oMQa1JdSJxYoZELwOJAXExP&index=10?
  // 2:54:02

  return (
    <div className="row ml-3">
      <h1 className="text-white font-bold text-xl pt-2 tracking-wide">
        {title}
      </h1>

      <div className="row__posters scroll-x-container  flex overflow-x-scroll overflow-y-hidden p-5">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleClick(movie)}
            className="relative group mr-[10px] w-[160px] flex-shrink-0  hover:scale-110 transition-transform duration-150 cursor-pointer"
          >
            <img
              className={`row__poster ${
                isLargeRow ? "max-h-[200px]" : "max-h-[100px]"
              } w-full object-contain transition-transform duration-150 hover:scale-110`}
              src={`https://image.tmdb.org/t/p/original/${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />

            <div className="absolute bottom-0 left-0 right-0 w-full h-full bg-black/10 text-white p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-content-center">
              <p className="">
                {movie.name || movie.title || movie.original_name}
              </p>
            </div>
          </div>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
