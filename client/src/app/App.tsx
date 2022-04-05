import React, { useState, Component, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux";

import { UserActions } from "app/actions";
import { Landing, Page404, Registration, SignIn, RestorePassword, Main } from "app/pages";


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(UserActions.auth())
  }, [])

  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/auth" element={<SignIn />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/restorepass" element={<RestorePassword />} />

        <Route path="/main" element={<Main />} />

        <Route path='*' element={<Page404 />} />
      </Routes>
    </div>

  );
}

export default App