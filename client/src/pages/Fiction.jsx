import React from 'react'
import Image from "../assets/banner.jpg"

function Fiction() {
    return (
        <>
        <div>
        <div className='relative'>
            <img className='h-64 w-full object-cover rounded-md' src={Image} alt='' />
            <div class="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
            <div class="absolute inset-0 flex items-center justify-center">
                <h2 class="text-white text-3xl font-bold">Fiction</h2>
            </div>
        </div>
        </div>
        </>
    )
}

export default Fiction
