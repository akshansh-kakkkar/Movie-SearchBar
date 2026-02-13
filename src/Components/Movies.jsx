import React, { useState } from "react";
import Movies from "../Movies.json";
const MoviesLibrary = () => {
  const [movies, setmovies] = useState(Movies.movies);
  const [search, setsearch] = useState("");
  const SearchBar = movies.filter((movies) => {
    const Search = search.toLowerCase();
    const MatchSearch =
      movies.title.toLowerCase().includes(Search) ||
      movies.year.toString().toLowerCase().includes(Search) ||
      movies.genre.toLowerCase().includes(Search) ||
      movies.category.toLowerCase().includes(Search) ||
      movies.tags.some((actor) => actor.toLowerCase().includes(Search)) ||
      movies.rating.toString().toLowerCase().includes(Search);
    return MatchSearch;
  });
  return (
    <>
      <div className="min-h-full bg-gray-100 pt-12 px-5 ">
        <div className="min-h-150  min-w-90 bg-white rounded-2xl p-12 shadow-1">
          <div className="flex justify-between place-items-baseline">
            <div className="flex flex-col gap-1 ">
              <h1 className=" text-3xl font-semibold Roboto">Movie Explorer</h1>
              <p className="flex-wrap text-gray-600 Poppins font-medium">Search, filter, and favourite movies. Designed for a single-page React component structure.</p>
            </div>
            <div className="flex">
              <p className="Poppins tracking-wide text-sm text-gray-600">
                Local Data • React state ready{" "}
              </p>
            </div>
          </div>
          <div className="">
            <img src="/assets/Search.svg" alt="search icon" />
            <input
              className="outline-none"
              type="text"
              placeholder="search for movies..."
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
          </div>

          {search && (
            <p className="">
              Found {SearchBar.length} movie
              {SearchBar.length !== 1 ? "s" : ""}
            </p>
          )}
          <div className="sm:grid sm:grid-cols-3 gap-5 justify-center">
            {search &&
              SearchBar.map((Movie) => (
                <div
                  key={Movie.id}
                  className="flex bg-blue-50 gap-4 m-4 justify-around hover:scale-1.2 hover:-translate-y-1 transition-all duration-300 flex-row shadow-1 min-w-90 max-w-90 min-h-25 max-h-25 items-center p-5 rounded-2xl   "
                >
                  <div>
                    <h1>{Movie.title}</h1>
                    <p>{Movie.year}</p>
                    <p>{Movie.genre}</p>
                  </div>
                  <div>
                    <div>
                      <div>{Movie.rating}</div>
                      <div>{Movie.category}</div>
                      <div>{Movie.tags.join("•")}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <h2 className="flex justify-center font-bold m-5 text-2xl">Movies</h2>
        <div className="sm:grid sm:grid-cols-4">
          {movies.map((Movie) => (
            <div
              key={Movie.id}
              className="flex bg-blue-50 gap-4 m-4 justify-around hover:scale-1.2 hover:-translate-y-1 transition-all duration-300 flex-row shadow-1 min-w-90 max-w-90 min-h-25 max-h-25 items-center p-5 rounded-2xl   "
            >
              <div>
                <h1>{Movie.title}</h1>
                <p>{Movie.year}</p>
                <p>{Movie.genre}</p>
              </div>
              <div>
                <div>
                  <div>{Movie.rating}</div>
                  <div>{Movie.category}</div>
                  <div>{Movie.tags.join("•")}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MoviesLibrary;
