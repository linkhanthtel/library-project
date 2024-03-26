import React, { useEffect, useState } from 'react'
import axios from 'axios'
import image from '../assets/image.jpg'
import library from '../assets/library.jpg'
import {Link} from 'react-router-dom'
import { IoIosAddCircle } from "react-icons/io";

function Home() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:8000/books')
        setBooks(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBooks()
  }, [])

  const deleteBooks = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/books/${id}`)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-gradient-to-tr from-amber-950 to-amber-900'>
      <div className='flex justify-around items-center text-white'>
        <h1 className='my-5 text-center text-3xl font-bold'>Books Collection</h1>
        <div>
          <Link to="/add">
            <IoIosAddCircle className='my-5 text-center text-5xl font-bold' />
          </Link>
        </div>
      </div>
      <div>
          <img src={library} className='w-screen h-96' alt="Library" />
      </div>
      <div className='m-[-100px] flex justify-center self-center'>
        <div className='mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>
          {books.map((book) => {
            return(
              <div className='p-7 w-96 h-auto rounded-sm bg-stone-700 text-white shadow-sm flex flex-col hover:shadow-xl hover:shadow-stone-950' key={book.id}>
                  <img src={image} alt="Image" className='h-auto' />
                  <div className='mt-5 flex justify-between'>
                    <span className='font-bold'>{book.title}</span>
                    <span>${book.price}</span>
                  </div>
                  <div className='flex items-center py-5'>
                    <p>{book.about}</p>
                  </div>
                  <div className='flex flex-row justify-between'>
                    <button className='p-3 bg-green-500 text-white rounded-lg hover:bg-green-700'><Link to={`/update/${book.id}`}>Update</Link></button>
                    <button className='p-3 bg-red-500 text-white rounded-lg hover:bg-red-700' onClick={() => deleteBooks(book.id)}>Delete</button>
                  </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='mt-20 p-3 bg-black text-white text-center'>
          <p>© 2024 | This site is developed only for hobby project</p>
      </div>
    </div>
  )
}

export default Home


