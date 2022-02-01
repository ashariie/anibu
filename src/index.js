import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";
import App from "./App";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Anime from "./pages/Anime";
import Manga from "./pages/Manga";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="anime" element={<Anime />} />
        <Route path="manga" element={<Manga />} />
        <Route path="detail/:type/:id" element={<Detail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
