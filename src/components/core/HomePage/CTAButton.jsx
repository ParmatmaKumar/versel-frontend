import React from 'react'
import { Link } from 'react-router-dom';
const CTAButton = ({ children, active, linkto }) => {
    return (
        <Link to={linkto}>
            <div className={`text-center text-[16px] rounded-md font-bold px-6 py-3 hover:shadow-none hover:scale-95 transition-all duration-200 ${active ? "bg-yellow-300 text-black":"bg-[#161D29]"}`}>

                {children}
            </div>
       </Link >

    )
}
export default CTAButton;

