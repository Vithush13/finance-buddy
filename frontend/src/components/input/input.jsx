import React, { useState } from "react";
import {FaRegEye ,FaRegEyeSlash} from "react-icons/fa6";

export default function Input({value, onChange, placeholder, label,type}){
    const [showPassword , setShowPassword] = useState(false);
    const toggleShowPassword = () =>{
        setShowPassword(!showPassword);
    };
    return(
        <div>
           <label className ="text-[15px] text-slate-800">{label}</label>
           <div className="input-box">
            <input
              type={type == 'password' ? showPassword ?'text':'password': type}
              placeholder={placeholder}
              className="flex-1 bg-transparent outline-none border-none "
              value={value}
              onChange={(e)=> onChange(e)} />

              {type === "password" && (
                <>
                {showPassword ? (
                    <FaRegEye
                     size={22}
                     className=" text-primary cursor-pointer"
                     onClick={()=>toggleShowPassword()}
                     />
                 ) : (
                    <FaRegEyeSlash
                     size={22}
                     className=" text-primary cursor-pointer"
                     onClick={()=>toggleShowPassword()}
                     />
                )}
                    </>
              )}
           </div>
        </div>
    )
}