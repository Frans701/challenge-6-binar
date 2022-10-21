import React from "react";
import NoPage from "../components/NoPage";

function Page404() {
  const text = "Ups, kamu tersesat!";
  return (
    <>
      <NoPage text={text} />
    </>
  );
}

export default Page404;
