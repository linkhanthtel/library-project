import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Add() {
  const [books, setBooks] = useState({
    title: "",
    about: "",
    cover: "",
    price: null,
  })
  const navigate = useNavigate()

  function handleChange(e) {
    setBooks(prev => ({...prev, [e.target.name] : e.target.value }))
  }

  async function formSubmit(e) {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/books', books)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className='bg-gradient-to-tl from-amber-900 to-amber-950 flex flex-col justify-center items-center'>
      <Link to="/"><IoArrowBackCircleSharp className='text-white text-5xl m-10' /></Link>
      <div className='mt-40 mb-96 p-10 bg-stone-800 shadow-lg'>
        <h1 className='text-white text-center text-3xl my-3'>Add New Book</h1>
        <div className='flex flex-col w-96'>
          <input required type="text" className='my-3 border border-gray-400 p-2 w-full' placeholder='Title' name='title' onChange={handleChange} />
          <input required type="text" className='my-3 border border-gray-400 p-2 w-full' placeholder='About' name='about' onChange={handleChange} />
          <input required type="text" className='my-3 border border-gray-400 p-2 w-full' placeholder='Cover' name='cover' onChange={handleChange} />
          <input required type="number" className='my-3 border border-gray-400 p-2 w-full' placeholder='Price' name='price' onChange={handleChange} />
          <button className='p-3 bg-green-500 text-white' onClick={formSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Add
