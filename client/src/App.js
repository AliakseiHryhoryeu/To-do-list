import React, { useState, Component } from "react";
import { Routes, Route, Link } from "react-router-dom"

import Header from "@components/Header";
import Footer from "@components/Footer";

import Landing from "@pages/Landing";
import Page404 from "@pages/Page404";

import Registration from "@pages/Registration";
import SignIn from "@pages/SignIn";
import RestorePassword from "@pages/RestorePassword";
import Main from "@pages/Main";


function App() {
  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/auth" element={<SignIn />} />
        <Route path="/restorepass" element={<RestorePassword />} />
        <Route path="/main" element={<Main />} />

        <Route path='*' element={<Page404 name="test props" />} />
      </Routes>
    </div>

  );
}

export default App