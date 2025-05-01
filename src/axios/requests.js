import conf from "../config/config";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${conf.tmdbApiKey}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${conf.tmdbApiKey}&with_networks=213`,
  fetchAmazonPrime: `/discover/tv?api_key=${conf.tmdbApiKey}&with_networks=1024`,
  fetchDisneyPlus: `/discover/tv?api_key=${conf.tmdbApiKey}&with_networks=2739`,
  fetchHulu: `/discover/tv?api_key=${conf.tmdbApiKey}&with_networks=453`,
  fetchAppleTv: `/discover/tv?api_key=${conf.tmdbApiKey}&with_networks=2552`,
  fetchHboMax: `/discover/tv?api_key=${conf.tmdbApiKey}&with_networks=3186`,
  fetchTopRated: `/movie/top_rated?api_key=${conf.tmdbApiKey}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${conf.tmdbApiKey}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${conf.tmdbApiKey}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${conf.tmdbApiKey}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${conf.tmdbApiKey}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${conf.tmdbApiKey}&with_genres=99`,
};

export default requests;
