import React from 'react'
import { favourites } from '../graphql/vars'

export default function FavCard(props) {
  const movie = props.movie
  const poster = props.movie.poster_path
  const lastFavourites = favourites()
  function removeFavourites(movieId) {
    let cleanFavourites = lastFavourites.filter(favourite => favourite._id !== movieId)
    favourites(cleanFavourites)

  }
  return (
    <div role="movie-card" className="card shadow d-flex flex-column justify-content-around m-2 p-1" style={{"minWidth": "18rem", "maxWidth": "18rem"}}>
      <div className="p-1">
        <img src={poster} className="card-img-top" alt="...."/>
      </div>
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        {/* <p className="card-text">{movie.overview}</p> */}
        <p>{movie.popularity.toFixed(2)}</p>
        <button onClick={() => removeFavourites(movie._id)} className="btn btn-dark">delete from Favourite</button>
      </div>
    </div>
  )
}
