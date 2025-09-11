import React, { useContext, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import Input from "../components/input/input";
import AuthLayout from "../components/layouts/authLayout";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axios";
import { API_PATHS } from "../utils/apiPath";
import { UserContext } from "../context/userContext";

export default function Login() {
    const[email,setEmail] = useState("");
    const[error,setError] = useState(null);
    const[password,setPassword] = useState("");
    const {updateUser} = useContext(UserContext);
    
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

         try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{email,password});
            const {token,user} = response.data;

            if(token){
              localStorage.setItem("token", token);
              updateUser(user);
              navigate("/dashboard");
            }
         } catch(error){
             if(error.response && error.response.data.message) {
              setError(error.response.data.message);
             } else {
              setError("Something is wrong");
             }
         }
    }
  return (
    <AuthLayout>
        <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-2xl front-semibold text-black"> Welcome Back!</h3>
        <p className="text-lg text-slate-700 mt-[5px] mb-6">
            Please enter your details to Login
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
              <Link className="font-medium text-primary underline text-blue-500" to="/signup"> SignUp</Link>
             </p>
        </form>

        </div>  
    </AuthLayout>
  );
}
