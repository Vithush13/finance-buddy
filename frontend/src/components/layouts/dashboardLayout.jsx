import React, {  useContext } from "react";
import { UserContext } from "../../context/userContext";
import SideMenu from "./sideMenu";
import Navbar from "./navbar";
export default function DashboardLayout ({children, activeMenu}) {
    const {user} = useContext(UserContext);

    return(
        <div className="">
            <Navbar activeMenu ={activeMenu}/>
            
            {user && (
                <div className="flex" >
                    <div className="mx-[1080px]:hidden">
                       <SideMenu activeMenu={activeMenu} />
                    </div>

                    <div className="grow mx-5">{children}</div>
                </div>
            )}
        </div>
    )
}