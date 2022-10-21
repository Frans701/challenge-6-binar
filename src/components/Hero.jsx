import React from "react";

function Hero({ movie }) {
  return (
    <>
      <div className="relative h-screen w-full">
        {/* Text */}
        <div className="container mx-auto">
          <div className="absolute z-[1] text-white text-left w-[700px] mt-[250px]">
            <h1 className="text-6xl font-bold">{movie.title}</h1>
            <p className="mt-6 text-sm">{movie.overview}</p>
            <button class="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-full uppercase mt-6 flex items-center">
              <box-icon color="white" name="play-circle"></box-icon>
              <span className="ml-2">Watch Trailer</span>
            </button>
          </div>
        </div>
        {/* Image */}
        <div className="absolute w-full top-0">
          <img
            className="w-full"
            src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
            alt={movie.path}
          />
        </div>
        {/* Black background */}
        <div className="absolute w-full h-screen bg-black bg-opacity-50"></div>
      </div>
    </>
  );
}

export default Hero;
