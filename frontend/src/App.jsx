import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Dashboard from "./pages/dashboard";
import Expenses from "./pages/expense";
import Challenges from "./pages/challenges";
import Friends from "./pages/friends";

export default function App() {
  return (
    <Router>
      <div>
       
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/friends" element={<Friends />} />
          </Routes>
       
      </div>
    </Router>
  );
}
