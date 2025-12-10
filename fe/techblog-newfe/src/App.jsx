import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import ViewProfile from "./components/ViewProfile";
import CreatePost from "./components/CreatePost";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/view-profile/:userId" element={<ViewProfile />} />
        </Route>
        {/* <Route path="/*" element={<No_page />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
