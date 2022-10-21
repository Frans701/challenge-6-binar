import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLogin from "../components/GoogleLogin";

const Login = ({ setToken }) => {
  const redirect = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Email is required");
      return;
    }
    if (password === "") {
      alert("Password is required");
      return;
    }
    if (email !== "" && password !== "") {
      const data = {
        email,
        password,
      };
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_AUTH_API}/api/v1/auth/login`,
          data
        );
        if (result.data.token) {
          localStorage.setItem("token", result.data.token);
          setToken(result.data.token);
          redirect("/");
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <section class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md p-5">
          <>
            <div className="font-extrabold text-2xl mb-6 text-center">
              Login Your Account
            </div>

            <div className="mb-3">
              <GoogleLogin setToken={setToken} label="Login with Google" />
            </div>
            <div className="text-center">or</div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  for="emailLogin"
                  className="block mb-2 text-sm font-medium "
                >
                  Email address
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  id="emailLogin"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3" controlId="formBasicPassword">
                <label
                  className="block mb-2 text-sm font-medium "
                  for="passwordLogin"
                >
                  Password
                </label>
                <input
                  if="passwordLogin"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mt-12">
                <button
                  className="w-full bg-red-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  variant="primary"
                  size="lg"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        </div>
      </section>
    </div>
  );
};

export default Login;
