import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import Input from "../components/input/input";
import AuthLayout from "../components/layouts/authLayout";
import { validateEmail } from "../utils/helper";
import ProfilePhoto from "../components/input/profilePhoto";

export default function SignUp() {
  const [profileImg,setProfileImg] = useState(null);
  const [name,setName] = useState("");;
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);

  const navigate = useNavigate();

  const handeleSignUp = async (e) =>{
    e.preventDefault();
    let profileImageUrl = "";
    if (!name){
              setError("Please enter your name.");
              return;
       }
    if (!validateEmail(email)){
              setError("Please enter a vaild Email.");
              return;
       }
       
       if (!password){
              setError("Please enter the password.");
              return;
       }

       setError("");
  }
  return (
           <AuthLayout>
                  <div className="lg:w-[90%] h-auto md:h-full md:mt-0 mt-10 flex flex-col justify-center ml-10">
                  <h3 className="text-2xl front-semibold text-black"> Create an Account</h3>
                  <p className="text-lg text-slate-700 mt-[5px] mb-6">
                      Enter your details below.
                  </p>
                  <form onSubmit={handeleSignUp}>
                    <ProfilePhoto image={profileImg} setImage={setProfileImg} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input 
                       value={name}
                       onChange= {({target})  => setName(target.value)} 
                       label = "Name"
                       placeholder ="Name"
                       type= "text"
                      />
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
                      </div>
                       {error && <p className="text-red-500 text-xs pb-3 ">{error}</p>}
          
                       <button type ="submit" className="btn-primary ">SignUp</button>
          
                       <p className="text-[13px] text-slate-800 mt-3">
                        Already have an Account? {" "}
                        <Link className="font-medium text-primary underline text-blue-500" to="/login"> Login</Link>
                       </p>
                    
                  </form>
          
                  </div>  
              </AuthLayout>
  );
}
