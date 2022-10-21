import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./routes/Detail";
import Navbar from "./components/Navbar";
import SearchPage from "./routes/SearchPage";
import Homepage from "./routes/Homepage";
import Page404 from "./routes/Page404";
import Soon from "./routes/Soon";
import Register from "./routes/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import Protected from "./components/Protected";
import Login from "./routes/Login";

function App() {
  // Get token from local storage
  const tokenLocalStorage = localStorage.getItem("token");
  // So we will pas token from local storage to this state
  // This is global state
  // For futher, we will use redux for global state (state management)
  const [token, setToken] = useState(tokenLocalStorage);
  return (
    <>
      <div className="font-poppins">
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Navbar token={token} setToken={setToken} />}
              >
                <Route path="/" element={<Homepage />} />
                <Route
                  path="detail/:detailId"
                  element={
                    <Protected token={token} setToken={setToken}>
                      <Detail />
                    </Protected>
                  }
                />
                <Route
                  path="/login"
                  element={<Login token={token} setToken={setToken} />}
                />
                <Route path="searchPage" element={<SearchPage />} />
                <Route
                  path="/login"
                  element={<Login token={token} setToken={setToken} />}
                />
                <Route
                  path="/register"
                  element={<Register setToken={setToken} />}
                />
                <Route path="soon" element={<Soon />} />
                <Route path="*" element={<Page404 />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </div>
    </>
  );
}

export default App;
