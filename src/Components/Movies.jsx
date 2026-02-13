import React, { useState } from "react";
import Movies from "../Movies.json";
const MoviesLibrary = () => {
  const [movies, setmovies] = useState(Movies.movies);
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="">
      {movies.map((Movie) => (
        <div key={Movie.id}>
          <div>
            <h1>{Movie.title}</h1>
            <p>{Movie.year}</p>
            <p>{Movie.genre}</p>
          </div>
          <div>
            <div>
              <div>{Movie.rating}</div>
              <div>{Movie.category}</div>
              <div>{Movie.tags}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default MoviesLibrary;
