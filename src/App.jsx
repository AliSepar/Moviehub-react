import Banner from "./components/Banner.jsx";
import Navbar from "./components/Navbar.jsx";
import Row from "./components/Row";
import requests from "./axios/requests.js";

function App() {
  return (
    <div className="bg-black relative">
      {/* navbar */}
      <Navbar />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUlr={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row
        title="Amazon Prime"
        fetchUlr={requests.fetchAmazonPrime}
        isLargeRow={true}
      />
      <Row
        title="Disney+"
        fetchUlr={requests.fetchDisneyPlus}
        isLargeRow={true}
      />
      <Row
        title="Apple Tv+"
        fetchUlr={requests.fetchAppleTv}
        isLargeRow={true}
      />
      <Row title="HBO Max" fetchUlr={requests.fetchHboMax} isLargeRow={true} />
      <Row title="Hulu" fetchUlr={requests.fetchHulu} isLargeRow={true} />
      <Row title="Trending Now" fetchUlr={requests.fetchTrending} />
      <Row title="Top Rated" fetchUlr={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUlr={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUlr={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUlr={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUlr={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUlr={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
