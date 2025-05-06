import React, { useState, useEffect } from "react";
import axios from "../../axios/axios.js";
import conf from "../../config/config.js";
import { BiPlayCircle } from "react-icons/bi";
import YouTube from "react-youtube";

function MovieModal({ isOpen, onClose, movieId }) {
  if (!isOpen) return null;
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [StreamingProviders, setStreamingProviders] = useState([]);

  // Fetch movie details from the API using movieId
  useEffect(() => {
    if (!movieId) return;

    const fetchMediaAndProviders = async () => {
      try {
        // Try fetching both movie and TV show data in parallel
        const [movieRes, tvRes] = await Promise.allSettled([
          axios.get(`/movie/${movieId}?api_key=${conf.tmdbApiKey}`),
          axios.get(`/tv/${movieId}?api_key=${conf.tmdbApiKey}`),
        ]);

        // Helper function to fetch streaming providers
        const fetchProviders = async (type) => {
          const providersRes = await axios.get(
            `/${type}/${movieId}/watch/providers?api_key=${conf.tmdbApiKey}`
          );
          return providersRes.data?.results?.US || null;
        };

        // If movie is found
        if (movieRes.status === "fulfilled") {
          setMovieData(movieRes.value.data);
          const providers = await fetchProviders("movie");
          setStreamingProviders(providers);
          console.log("✅ Fetched as Movie");

          // If TV show is found
        } else if (tvRes.status === "fulfilled") {
          setMovieData(tvRes.value.data);
          const providers = await fetchProviders("tv");
          setStreamingProviders(providers);
          console.log("✅ Fetched as TV Show");

          // Neither found
        } else {
          console.error("❌ Could not fetch data as movie or TV show.");
        }
      } catch (error) {
        console.error("❌ Unexpected error occurred:", error);
      }
    };

    fetchMediaAndProviders();
  }, [movieId]);

  // Fetch trailer URL from the API using movieId
  const handleWatchClick = (movieData) => {};
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoPlay: 1,
    },
  };

  // console.log("providers: ", StreamingProviders);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/50">
      <div className="bg-zinc-900 text-white w-full max-w-5xl mx-auto rounded-xl shadow-lg p-2 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-400 text-lg hover:cursor-pointer hover:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center transition duration-100"
        >
          &times;
        </button>

        <div className="text-white p-4 md:p-2 rounded-lg max-w-6xl mx-auto my-5 flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
            alt="Another Simple Favor Poster"
            className="w-full max-w-xs rounded-xl object-cover"
          />

          {/* Info Section */}
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                {movieData.name || movieData.title || movieData.original_name}{" "}
                {movieData.release_date && (
                  <span className="text-sm">
                    ({movieData?.release_date?.slice(0, 4)})
                  </span>
                )}
              </h1>
              {movieData.tagline && (
                <p className="text-slate-300 italic mt-1">
                  {movieData.tagline}
                </p>
              )}
            </div>

            {/* Genres */}
            <div className="flex gap-2 flex-wrap">
              {movieData.genres?.map((genre, index) => (
                <span
                  key={genre.id}
                  className={`text-white text-sm px-3 py-1 rounded-full ${
                    index % 3 === 0
                      ? "bg-pink-600"
                      : index % 3 === 1
                      ? "bg-rose-500"
                      : "bg-red-500"
                  }`}
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Rating + Trailer */}
            <div className="flex items-center gap-6 mt-2">
              <div className="text-center">
                <div className="text-yellow-400 text-2xl font-semibold">
                  ⭐ {Number(movieData.vote_average).toFixed(1)}
                </div>
                {/* <div className="text-sm text-slate-400">Rating</div> */}
              </div>
              <button
                className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition hover:cursor-pointer"
                onClick={() => handleWatchClick(movieData)}
              >
                <BiPlayCircle size={24} />
                <span>Watch Trailer</span>
              </button>
            </div>

            {/* Overview */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-1">Overview</h2>
              <p className="text-slate-300">{movieData.overview}</p>
            </div>

            {/* Details */}
            <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-400">
              <p>
                <span className="text-white font-semibold">Status:</span>{" "}
                {movieData.status}
              </p>
              <p>
                <span className="text-white font-semibold">Release Date:</span>{" "}
                {movieData.release_date || movieData.last_air_date}
              </p>
              {movieData.runtime && (
                <p>
                  <span className="text-white font-semibold">Runtime:</span>{" "}
                  {movieData.runtime} minutes
                </p>
              )}
            </div>

            {StreamingProviders?.flatrate?.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-white mb-2">
                  Watch on
                </h2>
                <div className="flex flex-wrap gap-4">
                  {StreamingProviders.flatrate.map((provider) => (
                    <div
                      key={provider.provider_id}
                      className="flex flex-col items-center bg-gray-800 p-3 rounded-lg shadow-md w-24"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                        alt={provider.provider_name}
                        className="h-12 w-12 object-contain mb-2"
                      />
                      <span className="text-white text-sm text-center">
                        {provider.provider_name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default MovieModal;
