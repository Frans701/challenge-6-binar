import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom";
import Movie from "../components/Movie";

function SearchPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  let getMovie = searchParams.get("search");
  const [searchMovieList, setSearchMovieLiest] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=907b5f77b10b2d71bf815146cfad03a7&query=${getMovie}`
      );
      setSearchMovieLiest(res.data.results);
    };
    getMovies();
  }, [getMovie]);

  return (
    <div className="mt-[80px] container mx-auto">
      <h1 className="text-4xl text-gray-800 font-bold">
        Search Result "{getMovie}"
      </h1>
      <div className="grid grid-cols-4 gap-10 rounded-sm my-6 ">
        {searchMovieList.map((movie) => {
          return (
            <div>
              <Link to={`/detail/${movie.id}`}>
                <Movie key={movie.id} movie={movie} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchPage;
