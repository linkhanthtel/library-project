import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Update() {
  const [books, setBooks] = useState({
    title: "",
    about: "",
    cover: "",
    price: null,
  })
  const navigate = useNavigate()
  const location = useLocation()

  function handleChange(e) {
    setBooks(prev => ({...prev, [e.target.name] : e.target.value }))
  }

  async function formSubmit(e) {
    const bookId = location.pathname.split('/')[2]
    e.preventDefault()
    try {
      await axios.put(`http://localhost:8000/books/${bookId}`, books)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className='bg-gradient-to-tl from-amber-900 to-amber-950 flex flex-col justify-center items-center'>
      <Link to="/"><IoArrowBackCircleSharp className='text-white text-5xl m-10' /></Link> 
      <div className='mt-40 mb-96 p-10 bg-white shadow-lg'>
        <h1 className='text-center text-3xl my-3'>Update Book</h1>
        <div className='flex flex-col w-96'>
          <input required type="text" className='my-3 border border-gray-400 p-2 w-full' placeholder='Update Title' name='title' onChange={handleChange} />
          <input required type="text" className='my-3 border border-gray-400 p-2 w-full' placeholder='Update About' name='about' onChange={handleChange} />
          <input required type="text" className='my-3 border border-gray-400 p-2 w-full' placeholder='Update Cover' name='cover' onChange={handleChange} />
          <input required type="number" className='my-3 border border-gray-400 p-2 w-full' placeholder='Update Price' name='price' onChange={handleChange} />
          <button className='p-3 bg-green-500 text-white' onClick={formSubmit}>Update</button>
        </div>
      </div>
    </div>
  )
}

export default Update
