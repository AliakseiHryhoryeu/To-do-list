import React, { useState } from "react";
import Header from "./components/Header";
import Page404 from "./components/Page404";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="todo">
      <Header />
      <Page404 />
      <Footer />
    </div>
  );
}

export default App;
