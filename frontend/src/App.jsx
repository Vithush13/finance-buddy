import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Dashboard from "./pages/dashboard";
import Expenses from "./pages/expense";
import Challenges from "./pages/challenges";
import Friends from "./pages/friends";
import Login from "./user/login";
import SignUp from "./user/signup"
import UserProvider from "./context/userContext";
import Income from "./pages/income";
import {Toaster} from "react-hot-toast"

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
            <Route path="/expense" element={<Expenses />} />
            <Route path="/income" element={<Income />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/friends" element={<Friends />} />
          </Routes>
    </Router>
    </div>
     <Toaster
     toastOptions={{
        className: "",
      style: {
        background: "#1f2937", // dark gray
        color: "#f9fafb", // almost white
        fontSize: "14px",
        borderRadius: "8px",
         padding: "10px 16px",
       },
      }}/>

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
