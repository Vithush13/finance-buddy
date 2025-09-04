import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import Input from "../components/input/input";
import AuthLayout from "../components/layouts/authLayout";
import { validateEmail } from "../utils/helper";

export default function Login() {
    const[email,setEmail] = useState("");
    const[error,setError] = useState("null");
    const[password,setPassword] = useState("");
    
    const navigate = useNavigate();
    const handleLogin = async(e) => {
         e.preventDefault();
         if (!validateEmail(email)){
          setError("Please enter a vaild Email.");
          return;
         }
          if (!password){
          setError("Please enter a Password.");
          return;
         }

         setError("");
    }
  return (
    <AuthLayout>
        <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl front-semibold text-black"> Welcome Back!</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
            please enter your details to Login
        </p>
        <form onSubmit={handleLogin}>
            <Input 
             value={email}
             onChange= {({target})  => setEmail(target.value)} 
             label = "Email Adderss"
             placeholder ="email@example.com"
             type= "text"
            />
             <Input 
             value={password}
             onChange= {({target})  => setPassword(target.value)} 
             label = "Password"
             placeholder ="abcd123"
             type= "password"
            />
             {error && <p className="text-red-500 text-xs pb-3 ">{error}</p>}

             <button type ="submit" className="btn-primary">Login</button>

             <p className="text-[13px] text-slate-800 mt-3">
              Don't have an Account? {" "}
              <Link className="font-medium text-primary underline" to="/signup"> SignUp</Link>
             </p>
        </form>

        </div>  
    </AuthLayout>
  );
}
