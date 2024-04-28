import React from 'react'
import BannerForHome from '../assets/bookstore.jpg'
import { GoDot } from "react-icons/go";

function HomeBanner() {
    return (
        <>
        <div className='min-h-[550px]'>
            <div className='min-h-[550px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0'>
                <div data-aos='slide-up' className='container'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 items-center'>
                        {/* Image */}
                        <div>
                            <img
                            src={BannerForHome}
                            alt=''
                            className='max-w-[400px] h-[350px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover'
                            />
                        </div>
                        {/* Text section */}
                        <div className='flex flex-col justify-center gap-6 sm:pt-0'>
                            <h1 className='text-3xl sm:text-4xl font-bold'>Buy book from your home</h1>
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center gap-4'>
                                <GoDot className='text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400' />
                                <p>Fast Delivery</p>
                                </div>
                                <div className='flex items-center gap-4'>
                                <GoDot className='text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400' />
                                <p>Quality Books</p>
                                </div>
                                <div className='flex items-center gap-4'>
                                <GoDot className='text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400' />
                                <p>Easy Payment Method</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default HomeBanner
