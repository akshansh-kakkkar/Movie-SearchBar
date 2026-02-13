import React, { useState } from "react";
import Movies from "../Movies.json";

const MoviesLibrary = () => {
  const [movies, setmovies] = useState(Movies.movies);
  const [search, setsearch] = useState("");
  const [favouriteSection, setFavouriteSection] = useState([]);
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
  const Resetbutton = () => {
    setsearch("");
  };
  const togglefavourite = (movie) => {
    const AlredyFavourite = favouriteSection.find((mov) => mov.id === movie.id);
    if (AlredyFavourite) {
      setFavouriteSection(
        favouriteSection.filter((mov) => mov.id !== movie.id),
      );
    } else {
      setFavouriteSection([...favouriteSection, movie]);
    }
  };

  return (
    <>
      <div className="min-h-full bg-gray-100 pt-12 px-5 ">
        <div className="min-h-150  min-w-90 bg-white rounded-2xl p-12 shadow-1">
          <div className="flex justify-between place-items-baseline">
            <div className="flex flex-col gap-1 ">
              <h1 className=" text-3xl font-semibold Roboto">Movie Explorer</h1>
              <p className="flex-wrap text-gray-600 Poppins font-medium">
                Search, filter, and favourite movies. Designed for a single-page
                React component structure.
              </p>
            </div>
            <div className="flex">
              <p className="Poppins tracking-wide text-sm text-gray-600">
                Local Data • React state ready{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 bg-white p-4 Poppins font-se ">
            <img src="/assets/Search.svg" className="w-5" alt="search-icon" />
            <input
              className="outline-none w-10/12 p-3"
              type="text"
              placeholder="search for movies..."
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
            <div className="flex gap-5">
              <img
                onClick={Resetbutton}
                src="/assets/cross.svg"
                className="w-5 hover:scale-[92%] cursor-pointer"
                alt="remove"
              />
              <button
                onClick={Resetbutton}
                className="shadow-1 flex gap-2 items-center bg-blue-400 rounded-2xl p-3 text-white Poppins text-xl hover:bg-blue-500 cursor-pointer hover:scale-[95%] transition-all duration-300"
              >
                <span>
                  <img src="assets/Reset.svg" className="w-7" alt="reset" />
                </span>
                Reset
              </button>
            </div>
          </div>

          {search && (
            <p className="text-gray-400 Poppins">
              {SearchBar.length} results found for "{search}"
            </p>
          )}
          <div className="sm:grid sm:grid-cols-2 gap-5 justify-center">
            <div>
              <div>
                <h1 className="Roboto text-xl m-4 font-semibold">
                  Matching Movies
                </h1>
              </div>
              {search &&
                SearchBar.map((Movie) => (
                  <div
                    key={Movie.id}
                    className="flex bg-blue-100  gap-4 m-3 hover:scale-1.2 hover:-translate-y-1 transition-all duration-300 flex-row shadow-1 min-w-170 max-w-170 min-h-20 max-h-20 items-center p-5 rounded-2xl   "
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
                        <div>
                          <img
                            src="/assets/star.svg"
                            className="w-5"
                            onClick={() => togglefavourite(Movie)}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div>
              <h2 className="Roboto font-semibold text-xl m-4">
                Favourite Movies
              </h2>
              <div>
                {favouriteSection &&
                  favouriteSection.map((favourites) => (
                    <div key={favourites.id}>{favourites.title}</div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <h2 className="flex justify-center font-bold m-5 text-2xl">
          Movies Library
        </h2>
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
                  <div>
                    <img
                      src="/assets/star.svg"
                      className="w-5"
                      onClick={() => togglefavourite(Movie)}
                      alt=""
                    />
                  </div>
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
