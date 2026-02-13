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
      <div className="min-h-screen bg-gray-100 pt-12 px-5 ">
        <div className="min-h-150  min-w-90  bg-white rounded-2xl p-12 shadow-1">
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
                Local Data • React state ready
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
                    className=" bg-blue-100  gap-4 m-3 hover:scale-1.2 hover:-translate-y-1 transition-all duration-300  shadow-1 min-w-170 max-w-170 min-h-25 max-h-25 items-center p-5 rounded-2xl   "
                  >
                    <div className="flex gap-6  items-center">
                      <h1 className="font-serif text-lg font-semibold">
                        {Movie.title}
                      </h1>
                      <p className="Poppins text-gray-500">{Movie.year}</p>
                      <p className="Poppins text-gray-600">{Movie.genre}</p>
                    </div>
                    <div className="flex justify-between m-1">
                      <div className="flex gap-5 items-center my-2">
                        <div className="flex gap-3 items-center   bg-yellow-200 px-3 py-1  rounded-2xl ">
                          <img
                            src="/assets/star.svg"
                            className="w-5"
                            alt="rating-icon"
                          />
                          {Movie.rating}
                        </div>
                        <div className="bg-white rounded-2xl px-3 py-1 items-center Poppins font-semibold text-gray-600">
                          {Movie.category}
                        </div>
                        <div className="text-gray-600 Poppins">
                          {Movie.tags.join(" • ")}
                        </div>
                      </div>
                      <div
                        className="flex gap-4 items-center -translate-y-6 Poppins font-semibold transition-all duration-300 text-white hover:bg-red-500 bg-[#ff00009a] rounded-2xl p-2"
                        onClick={() => togglefavourite(Movie)}
                      >
                        <img
                          src="/assets/heart.svg"
                          className="w-8"
                          alt="favorite-icon"
                        />
                        <span>Favorite</span>
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

        <h2 className="flex justify-center font-bold m-5 Roboto text-3xl">
          Movies Library
        </h2>
          <div className="grid grid-cols-2">
            {movies &&
              movies.map((Movie) => (
                <div
                  key={Movie.id}
                  className=" bg-blue-100  gap-4 m-3 hover:scale-1.2 hover:-translate-y-1 transition-all duration-300  shadow-1 min-w-170 max-w-170 min-h-25 max-h-25 items-center p-5 rounded-2xl   "
                >
                  <div className="flex gap-6  items-center">
                    <h1 className="font-serif text-lg font-semibold">
                      {Movie.title}
                    </h1>
                    <p className="Poppins text-gray-500">{Movie.year}</p>
                    <p className="Poppins text-gray-600">{Movie.genre}</p>
                  </div>
                  <div className="flex justify-between m-1">
                    <div className="flex gap-5 items-center my-2">
                      <div className="flex gap-3 items-center   bg-yellow-200 px-3 py-1  rounded-2xl ">
                        <img
                          src="/assets/star.svg"
                          className="w-5"
                          alt="rating-icon"
                        />
                        {Movie.rating}
                      </div>
                      <div className="bg-white rounded-2xl px-3 py-1 items-center Poppins font-semibold text-gray-600">
                        {Movie.category}
                      </div>
                      <div className="text-gray-600 Poppins">
                        {Movie.tags.join(" • ")}
                      </div>
                    </div>
                    <div
                      className="flex gap-4 items-center -translate-y-6 Poppins font-semibold transition-all duration-300 text-white hover:bg-red-500 bg-[#ff00009a] rounded-2xl p-2"
                      onClick={() => togglefavourite(Movie)}
                    >
                      <img
                        src="/assets/heart.svg"
                        className="w-8"
                        alt="favorite-icon"
                      />
                      <span>Favorite</span>
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
