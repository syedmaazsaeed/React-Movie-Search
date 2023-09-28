import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=c079542";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const searchMovies = async (title) => {
    if (title.trim() === "") {
      return; // Avoid making empty searches
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      if (response.ok) {
        const data = await response.json();
        setMovies(data.Search || []);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchMovies("SpiderMan");
  }, []);

  return (
    <div className="app">
      <h1>MoviesHub</h1>

      <div className="search">
        <input
          placeholder="Search For Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {loading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
