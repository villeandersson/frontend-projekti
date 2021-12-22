import React from "react";
import "./App.css";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

import Customerlist from "./components/customerlist";
import Traininglist from "./components/traininglist";

function App() {
  return (
    <div className="App">
      <h1 className="App-header">PERSONAL TRAINER</h1>
      <BrowserRouter>
        <div
          style={{
            paddingBottom: 15,
            fontSize: 30,
            fontFamily: "Franklin Gothic Medium",
          }}
        >
          <Link to="/">CUSTOMERS</Link> <Link to="/trainings">TRAININGS</Link>{" "}
          <Link to="/calendar">CALENDAR</Link>
        </div>
        <Routes>
          <Route path="/" element={<Customerlist />} />
          <Route path="/trainings" element={<Traininglist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
