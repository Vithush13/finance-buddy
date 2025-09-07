
import React, { useRef, useState,useEffect } from "react";
import {LuUser,LuUpload,LuTrash} from "react-icons/lu"

export default function ProfilePhoto({image, setImage}) {
    const inputRef = useRef(null);
    const [previewUrl,setPreviewUrl] = useState(null);

    const handleImageChange = (e)=>{
        const file = e.target.files[0];

        if(file){
            setImage(file);

            const filePreview = URL.createObjectURL(file);
            setPreviewUrl(filePreview);
        }
    };

    const handleRemoveImage =()=>{
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFlie = ()=>{
        inputRef.current.click();
    };

     
  return (
    <div className=" flex justify-center mb-6">
       <input 
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImageChange}
          className="hidden" />

        { !image ? (
            <div className="w-20 h-20 flex items-center justify-center bg-blue-100 rounded-full relative">
            <LuUser className="text-4xl text-primary" />
             
             <button 
             type="button"
             className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full absolute -bottom-1 -right-1"
             onClick={onChooseFlie}>
               <LuUpload/> 
             </button>
             </div>
        ) : (
            <div className="relative">
            <img 
              src={previewUrl}
              alt="profile photo"
              className ="w-20 h-20 rounded-full object-cover"/>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
                onClick={handleRemoveImage}
                >
                <LuTrash/>
                </button>
                </div>
        )
        }
      
    </div>
  );
}