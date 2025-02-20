import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate()
    
  return (
    <div className='flex flex-col items-center justify-center w-full max-w-sm gap-4 p-4 m-2 mx-auto bg-green-200 rounded'>
            <p className='font-bold text-green-900'>{Boolean(location?.state?.text)?location?.state?.text : "Payment"} Successfully</p>
            <button className='px-4 border rounded hover:bg-green-700 hover:text-neutral-50 border-neutral-900 w-fit' onClick={()=>navigate("/")}>Go Home</button>
    </div>
  )
}

export default SuccessPage