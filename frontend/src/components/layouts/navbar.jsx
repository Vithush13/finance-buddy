import React,{useState} from "react";
import {HiOutlineX,HiOutlineMenu} from "react-icons/hi";
import SideMenu from "./sideMenu";


export default function Navbar({activeMenu}){
    const [openSideMenu, setOpenSideMenu] = useState(false);
    return(
        <div className="flex gap-5 bg-white border boredr-b border-gray-200/50 backdrop-blur-[12px] py-1 px-7 sticky top-0 z-30">
        <button className="block lg:hidden text-black"
            onClick={()=>{
                setOpenSideMenu(!openSideMenu);
            }}>
                {openSideMenu ? (
                    <HiOutlineX className="text-2xl"/>
                ):
                (
                    <HiOutlineMenu className="text-2xl"/>
                )}
            </button>
         <div className="flex items-center gap-1">
  <img
    src="/logo.png"
    alt="Finance Buddy Logo"
    width={80}   // adjust width
    height={80}  // adjust height
    className="object-contain"
  />
  <h2 className="text-lg font-medium text-black">Finance-Buddy</h2>
</div>
            {openSideMenu && (
                <div className="fixed top-[61px] -ml-4 bg-white ">
                    <SideMenu activeMenu={activeMenu}/>
                    </div>
            )}

            </div>
    )
}