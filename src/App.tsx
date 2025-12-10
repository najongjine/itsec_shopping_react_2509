import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Maze from "./Pages/Maze";
import MazeRL from "./Pages/MazeRL";
import AiVtuber from "./Pages/AiVtuber";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aivtuber" element={<AiVtuber />} />
          <Route path="/maze" element={<Maze />} />
          <Route path="/mazerl" element={<MazeRL />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
