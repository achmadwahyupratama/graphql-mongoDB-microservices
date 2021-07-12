import { useMutation } from '@apollo/client'
import React from 'react'
import { DEL_MOVIE } from '../graphql/mutations'
import { GET_MOVIES } from '../graphql/queries'
import { favourites } from '../graphql/vars'
import { Link } from 'react-router-dom'

export default function MovieCard(props) {
  const movie = props.movie
  const poster = movie.poster_path
  const [delMovie, { error, loading, data: idToDel }] = useMutation(
    DEL_MOVIE, { refetchQueries: [ { query: GET_MOVIES } ], onCompleted: (data) => {
      let lastFavs = favourites()
      let cleanFavs = lastFavs.filter(e => e._id !== movie._id )
      favourites(cleanFavs)
      console.log(lastFavs, cleanFavs);
    } }
  )
  function addToFavourites(favourited){
    console.log(favourited);
    let lastFavs = favourites()
    let foundFav = lastFavs.find(mov => mov._id === favourited._id)
    if (!foundFav) {
      let newFavs = [...lastFavs, favourited]
      console.log(lastFavs, newFavs);
      favourites(newFavs)
    }
  }
  function destroy(idToDestroy) {
    console.log('destroying movie ', idToDestroy);
    delMovie( { variables: { id: idToDestroy } } )
  }
  return (
    <div role="movie-card" className="card shadow d-flex flex-column justify-content-around m-2 p-1" style={{"minWidth": "18rem", "maxWidth": "18rem"}}>
      <div className="p-1">
        <img src={poster} className="card-img-top" alt="...."/>
      </div>
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text">{movie.overview}</p>
        <p>{movie.popularity.toFixed(2)}</p>
        <button onClick={() => addToFavourites(movie)} className="btn btn-dark">Add Favourite</button>
        <button onClick={() => destroy(movie._id)} className="btn btn-danger">Delete</button>
        <Link className="btn btn-dark" to={`/edit-movie/${movie._id}`}>Edit</Link>
      </div>
    </div>
  )
}
