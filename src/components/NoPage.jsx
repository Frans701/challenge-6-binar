import React from "react";

function NoPage({ text }) {
  return (
    <>
      <div className="w-full h-screen text-4xl font-bold flex justify-center items-center text-gray-800">
        {text}
      </div>
    </>
  );
}

export default NoPage;
