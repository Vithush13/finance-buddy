import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Dashboard from "./pages/dashboard";
import Expenses from "./pages/expense";
import Challenges from "./pages/challenges";
import Friends from "./pages/friends";
import Login from "./user/login";
import SignUp from "./user/signup"
import UserProvider from "./context/userContext";

export default function App() {
  return (
    <UserProvider>
      <div>
    <Router>
          <Routes>
            <Route path="/" element={<Root />} />
             <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/friends" element={<Friends />} />
          </Routes>
    </Router>
    </div>
  </UserProvider>
  );
};


const Root =() =>{
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ?(
    <Navigate to ="/dashboard" />
  ):(
    <Navigate to="/login"/>
  )
        

}
