import React from "react";
import "./App.css";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

import Customerlist from "./components/customerlist";
import Traininglist from "./components/traininglist";
import Calendarscreen from "./components/calendar";
import Stats from "./components/stats";

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
          <Link to="/customers">CUSTOMERS</Link>{" "}
          <Link to="/trainings">TRAININGS</Link>{" "}
          <Link to="/calendar">CALENDAR</Link>{" "}
          <Link to="/stats">STATISTICS</Link>
        </div>
        <Routes>
          <Route path="/customers" element={<Customerlist />} />
          <Route path="/trainings" element={<Traininglist />} />
          <Route path="/calendar" element={<Calendarscreen />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
