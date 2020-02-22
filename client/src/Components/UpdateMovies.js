import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UpdateMovies = (props) => {
  console.log('update', props)

  // const id = props.movie.id

  const [newMovie, setNewMovie] = useState({
    id: Number(props.match.params.id),
    title: '',
    director: '',
    metascore: null,
    stars: []
  })

  useEffect(() => {
    const editMovie = props.movies.find( movie => {
      return `${movie.id}` === props.match.params.id
    }
    )
    
    if (editMovie) {
      setNewMovie(editMovie)
    }
    
  },[props.newMovie, props.match.params.id])

  const handleChange = (e) => {
    e.persist()
    if (e.target.name === 'stars') {
      setNewMovie({
        ...newMovie,
        [e.target.name]: e.target.value
      })
    }
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value
    })
    
  }

  
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .put(`http://localhost:5000/api/movies/${newMovie.id}`, newMovie)

      .then(res => {
        console.log(res.data)
        props.updatedMovies(res.data)
        props.history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  
  console.log(newMovie.id, newMovie)

  return (
    <div>
      <form onSubmit={handleSubmit} className="forms">
        <h2>Update Movie</h2>
        <input 
          type="text" 
          name="title" 
          placeholder="title" 
          value={newMovie.title} 
          onChange={handleChange}
          required
          />

        <input 
          type="text" 
          name="director"  
          placeholder="director" 
          value={newMovie.director} 
          onChange={handleChange}
          required
          />

        <input 
          type="number" 
          name="metascore"  
          placeholder="metascore" 
          value={Number(newMovie.metascore)} 
          onChange={handleChange}
          required
          />

        <input 
          type="text" 
          name="stars" 
          placeholder="stars" 
          value={newMovie.stars} 
          onChange={handleChange}
          required
        />

        <button>Update Movie</button>
      </form>
    </div>
  )
}

export default UpdateMovies
