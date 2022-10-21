import React from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";

function GoogleLogin({ setToken, label }) {
  const redirect = useNavigate();
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const data = {
          access_token: response.access_token,
        };
        const result = await axios.post(
          `${process.env.REACT_APP_AUTH_API}/api/v1/auth/google`,
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
    },
    onError: (error) => {
      alert(error);
    },
  });

  return (
    <div className="d-grid">
      <div className="m-auto">
        <button
          className="bg-gray-50 border border-gray-300 text-gray-900 px-4 py-2 rounded-xl w-full"
          onClick={googleLogin}
        >
          <FontAwesomeIcon icon={faGoogle} /> {label}
        </button>
      </div>
    </div>
  );
}

export default GoogleLogin;
