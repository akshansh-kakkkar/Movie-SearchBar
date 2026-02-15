import React, { useEffect, useState } from "react";
import Movies from "../Movies.json";

const MoviesLibrary = () => {
  const [movies, setmovies] = useState(Movies.movies);
  const [search, setsearch] = useState("");
  const [favouriteSection, setFavouriteSection] = useState(() => {
    try {
      const Saved = localStorage.getItem("favourites");
      return Saved ? JSON.parse(Saved) : [];
    } catch {
      return [];
    }
  });
  const [theme, settheme] = useState(false);
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
  const Toggletheme = () => {
    settheme((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favouriteSection));
  }, [favouriteSection]);
  return (
    <>
      <div
        className={`min-h-screen transition-all duration-300 ease-in pt-3 px-5 ${theme ? "bg-gray-700" : "bg-gray-100 "}`}
      >
        <div onClick={Toggletheme} className={`flex justify-end m-5 p-3  `}>
          <div
            className={
              theme
                ? "bg-white flex p-2 rounded-2xl gap-3 items-center"
                : "bg-blue-300 p-2 gap-3 items-center rounded-2xl flex"
            }
          >
            <span>
              <img
                src={
                  theme ? "/assets/Darktoggle.svg" : "/assets/lighttoggle.png"
                }
                width={40}
                alt="theme"
              />
            </span>
            <span className="Roboto">{theme ? "Dark mode" : "Light mode"}</span>
          </div>
        </div>
        <div
          className={`min-h-150   sm:min-w-90  rounded-2xl p-6 shadow-1 ${theme ? "bg-gray-600" : "bg-white"}`}
        >
          <div className="flex justify-between place-items-baseline">
            <div className="flex flex-col gap-1 ">
              <h1
                className={`text-3xl font-semibold Roboto ${theme ? "text-white" : "text-black"}`}
              >
                Movie Explorer
              </h1>
              <p
                className={`flex-wrap Poppins font-medium hidden sm:block  ${theme ? "text-gray-100" : "text-gray-600"}`}
              >
                Search, filter, and favourite movies. Designed for a single-page
                React component structure.
              </p>
            </div>

            <div className="flex">
              <p
                className={`Poppins tracking-wide text-sm  hidden sm:block ${theme ? "text-white" : "text-black"}`}
              >
                Local Data • React state ready
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:justify-center sm:items-center gap-4 p-4 Poppins font-serif ">
            <img
              src="/assets/Search.svg"
              className="w-5 hidden md:block"
              alt="search-icon"
            />
            <input
              className={`rounded-2xl outline-none w-full sm:w-10/12 border-red-400 sm:border-none p-3 border-3  ${theme ? "text-white" : "text-black"}`}
              type="text"
              placeholder="search for movies..."
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
            <div className="flex justify-center gap-5">
              <img
                onClick={Resetbutton}
                src="/assets/cross.svg"
                className="w-5 hover:scale-[92%] cursor-pointer hidden sm:block"
                alt="remove"
              />
              <button
                onClick={Resetbutton}
                className="shadow-1 flex gap-2  items-center  bg-blue-400 rounded-2xl p-3 text-white Poppins text-xl hover:bg-blue-500 cursor-pointer hover:scale-[95%] transition-all duration-300"
              >
                <span>
                  <img
                    src="assets/Reset.svg"
                    className="w-7 hidden md:block"
                    alt="reset"
                  />
                </span>
                Reset
              </button>
            </div>
          </div>

          {search && (
            <p className={`Poppins ${theme ? "text-white" : "text-gray-400"}`}>
              {SearchBar.length} results found for "{search}"
            </p>
          )}
          <div className="sm:grid xl:grid-cols-2 gap-5 justify-center">
            <div>
              <div>
                <h1
                  className={`Roboto text-xl m-4 font-semibold ${theme ? "text-gray-100" : "text-black"}`}
                >
                  Matching Movies
                </h1>
              </div>
              <div className="overflow-y-auto overflow-x-hidden rounded-2xl  h-[60vh] xl:w-[46vw]">
              {SearchBar.map((Movie) => (
                <div
                  key={Movie.id}
                  className={` gap-4  my-2  hover:scale-[96%] hover:-translate-y-1 transition-all duration-300  shadow-1 md:min-w-170 dm:max-w-170 dm;min-h-25 md:max-h-25 items-center p-5 rounded-2xl   ${theme ? "bg-[#9494942d]" : "bg-blue-100"}`}
                >
                  <div
                    className={`flex gap-6 line-clamp-1 flex-row  items-center ${theme ? "text-gray-100" : "text-black"}`}
                  >
                    <h1
                      className={`font-serif  max-w-[50%] truncate text-nowrap text-lg font-semibold ${theme ? "text-gray-100" : "text-black"}`}
                    >
                      {Movie.title}
                    </h1>
                    <p
                      className={`Poppins ${theme ? "text-gray-300" : "text-gray-500"}`}
                    >
                      {Movie.year}
                    </p>
                    <p
                      className={`Poppins ${theme ? "text-gray-300" : "text-gray-500"}`}
                    >
                      {Movie.genre}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div className="flex justify-between flex-col md:flex-row gap-5 items-center my-2">
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
                      <div className={`Poppins ${theme ? "text-gray-300" : "text-gray-600"}`}>
                        {Movie.tags.join(" • ")}
                      </div>
                    </div>
                    <div
                      className="flex gap-4 justify-center items-center md:-translate-y-6 Poppins font-semibold transition-all duration-300 text-white hover:bg-red-500 bg-[#ff00009a] rounded-2xl p-2"
                      onClick={() => togglefavourite(Movie)}
                    >
                      <img
                        src="/assets/heart.svg"
                        className="w-8"
                        alt="favorite-icon"
                      />
                      <span>
                        {favouriteSection.some((fav) => fav.id === Movie.id)
                          ? "Favorited"
                          : "Favorite"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
            <div>
              <h2
                className={`Roboto text-xl m-4 font-semibold ${theme ? "text-gray-100" : "text-black"}`}
              >
                Favourite Movies
              </h2>
              <div
                className={
                  favouriteSection.length === 0
                    ? "flex justify-center flex-col text-center items-center"
                    : "flex m-4  flex-wrap gap-5 Poppins"
                }
              >
                {favouriteSection.length === 0 ? (
                  <div className="flex justify-center items-center flex-col ">
                    <img
                      src="/assets/Info.svg"items-center
                      className="w-50"
                      alt="no items "
                    />
                    <p className="md:text-4xl text-2xl text-gray-800 Roboto font-bold">
                      No favorites found!
                    </p>
                  </div>
                ) : (
                  favouriteSection &&
                  favouriteSection.map((favourites) => (
                    <div
                      className="bg-[#ff0000ae] transition-all duration-300 text-white hover:bg-red-500 hover:-translate-y-1 font-semibold p-3 flex gap-5 rounded-2xl"
                      onClick={() => togglefavourite(favourites)}
                      key={favourites.id}
                    >
                      {" "}
                      <img
                        src="/assets/heart.svg"
                        className="w-8"
                        alt="favorite-icon"
                      />
                      <div className="flex gap-2 w-full sm:w-fit"><span className="line-clamp-1 ">{favourites.title}</span>({favourites.year})</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesLibrary;
