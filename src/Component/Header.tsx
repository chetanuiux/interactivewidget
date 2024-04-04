import React from 'react'
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className='py-2 px-3 bg-[#101e38]' >
        <div>
            <h2 onClick={() => navigate(`/`)} className='text-4xl text-orange-500 font-bold cursor-pointer'>CryptoCurry</h2>
        </div>
        <div>
        </div>
    </div>
  )
}

export default Header