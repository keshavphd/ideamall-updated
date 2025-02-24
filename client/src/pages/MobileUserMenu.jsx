import React from 'react'
import { useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';
import { RiCloseFill } from "react-icons/ri";

const MobileUserMenu = () => {
    const navigate = useNavigate()

    const handleClose = ()=>{
       navigate("/")
    }
return (
    <div className='p-2 m-1.5 shadow-md font-sans rounded bg-slate-100'>
        <button onClick={handleClose} className='float-right'><RiCloseFill size={24} /></button>
        <UserMenu/>
    </div>
)
   
}
export default MobileUserMenu
