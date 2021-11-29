import React, { useState, Component } from "react";
import {Routes, Route, Link } from "react-router-dom"

import Header from "./components/Header";
import Content404 from "./components/Content404";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import Page404 from "./pages/Page404";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='*' element={<Page404  name="teeeest" />} />
      </Routes>
    </div>
  );
}

export default App