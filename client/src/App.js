import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";
import NotFound from "./pages/notFound/NotFound";
import Genre from "./pages/genre/Genre";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Browse />} />
        <Route path="/search/:pageN" element={<Search />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/:genreId/:pageN" element={<Genre />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
