import React from "react";

function Movie({ movie }) {
  return (
    <div>
      <img
        className="h-[400px] w-full object-cover rounded-xl"
        src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
        alt={movie.path}
      />
    </div>
  );
}

export default Movie;
