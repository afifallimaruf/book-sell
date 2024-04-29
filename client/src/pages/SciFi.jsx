import React, { useState, useEffect } from 'react'
import Image from "../assets/banner.jpg"
import BookCard from '../components/BookCard'

function SciFi() {
    const [sciFiCategory, setSciFiCategory] = useState([])

    useEffect(()=> {
        const fetchData = async()=> {
            try {
                const res = await fetch("http://localhost:8080/api/book/get-books?category=science-fiction")

                const data = await res.json()
                
                if (!res.ok) {
                    console.log(data.message)
                } else {
                    setSciFiCategory(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])
    return (
    <>
        <div className='relative'>
            <img className='h-64 w-full object-cover rounded-md' src={Image} alt='' />
            <div class="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
            <div class="absolute inset-0 flex items-center justify-center">
                <h2 class="text-white text-3xl font-bold">Science Fiction</h2>
            </div>
        </div>
        <div className='mt-8 items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center'>
        {
            sciFiCategory.length > 0 ? (
                sciFiCategory.map((book)=> (
                    <div key={book._id}>
                    <BookCard data={book} />
                    </div>
            ))
            ) : (
                <div className='place-items-center'>
                    <h1 className='text-center'>there are no books yet!</h1>
                </div>
            )
        }
        </div>
    </>
    )
}

export default SciFi
