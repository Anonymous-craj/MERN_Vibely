import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import useGetCurrentUser from "./customHooks/getCurrentUser";
import { useSelector } from "react-redux";
import useGetSuggestedUsers from "./customHooks/getSuggestedUsers";
import Profile from "./pages/Profile";
export const serverUrl = "http://localhost:8000";
const App = () => {
  useGetCurrentUser();
  useGetSuggestedUsers();
  const { userData } = useSelector((state) => state.user);
  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/signin" />}
        />
        <Route
          path="/forgot-password"
          element={!userData ? <ForgotPassword /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:userName"
          element={userData ? <Profile /> : <Navigate to="/signin" />}
        />
      </Routes>
    </>
  );
};

export default App;
