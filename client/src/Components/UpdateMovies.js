import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UpdateMovies = (props) => {
  console.log(props)

  const [updatedMovie, setUpdatedMovie] = useState({
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
  })

  useEffect(() => {
    axios
    .get(`http://localhost:5000/api/movies`)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  },[updatedMovie])

  const handleChange = (e) => {
    e.persist()
    setUpdatedMovie({
      ...updatedMovie,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
    axios
      .put(`http://localhost:5000/api/movies/${updatedMovie.id}`, updatedMovie)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }



  return (
    <div>
      <form onSubmit={handleSubmit} className="forms">
        <h2>Update Movie</h2>
        <input 
          type="text" 
          name="title" 
          placeholder="title" 
          // value={props.title} 
          onChange={handleChange}
          />

        <input 
          type="text" 
          name="director"  
          placeholder="director" 
          // value={props.director} 
          onChange={handleChange}
          />

        <input 
          type="text" 
          name="metascore"  
          placeholder="metascore" 
          // value={props.director} 
          onChange={handleChange}
          />

        <input 
          type="email" 
          name="stars" 
          placeholder="stars" 
          // value={props.stars} 
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>Update Movie</button>
      </form>
    </div>
  )
}

export default UpdateMovies
