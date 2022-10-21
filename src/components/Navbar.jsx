import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";

function Navbar({ token, setToken }) {
  const [search, setSearch] = useState("");

  const redirect = useNavigate();

  const searchMovieList = (event) => {
    event.preventDefault();
    redirect(`/searchPage?search=${search}`);
  };

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          // Authorize from backend
          await axios.get(`${process.env.REACT_APP_AUTH_API}/api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          if (error.response.status === 401) {
            // remove token
            localStorage.removeItem("token");
            setToken(null);
            // Redirect to login page
            navigate("/login");
          }
        }
      }
    })();
  }, [token, navigate, setToken]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div>
      <nav className=" px-2 sm:px-4 absolute top-0 z-30 w-full">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to={"/"}>
            <span className="self-center text-3xl font-bold whitespace-nowrap text-red-600">
              Movielist
            </span>
          </Link>
          <div className="w-[400px]">
            <form onSubmit={searchMovieList}>
              <div className="relative">
                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                  type="input"
                  className="bg-transparent block p-2 pl-10 w-full text-sm text-white border-solid border border-red-600 rounded-full"
                  placeholder="What do you want to watch?"
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            {!token ? (
              <ul className="flex flex-col p-4 mt-4  border  md:flex-row md:space-x-2 md:mt-0 md:text-sm md:font-medium md:border-0">
                <li>
                  <Link to={"/login"}>
                    <span className="border-red-600 border text-red-700 font-normal py-2 px-4 rounded-full">
                      Login
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={"/register"}>
                    <span className="bg-red-600  text-white font-normal py-2 px-4 rounded-full">
                      Register
                    </span>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="flex flex-col p-4 mt-4  border  md:flex-row md:space-x-2 md:mt-0 md:text-sm md:font-medium md:border-0">
                <li>
                  <span className="border-red-600 border text-red-700 font-normal py-2 px-4 rounded-full">
                    <button variant="danger" size="lg" onClick={handleLogout}>
                      Logout
                    </button>
                  </span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export default Navbar;
