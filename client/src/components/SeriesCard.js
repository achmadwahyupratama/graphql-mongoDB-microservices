import React from 'react'
import { favourites } from '../graphql/vars';

export default function SeriesCard(props) {
  const series = props.series
  const poster = series.poster_path
  function addToFavourites(favourited){
    console.log(favourited);
    let lastFavs = favourites()
    let foundFav = lastFavs.find(mov => mov._id === favourited._id)
    if (!foundFav) {
      let newFavs = [...lastFavs, favourited]
      console.log(lastFavs, newFavs);
      favourites(newFavs)
    } else {
      return
    }
  }
  return (
    <div role="series-card" className="card shadow d-flex flex-column justify-content-around m-2 p-1" style={{"minWidth": "18rem", "maxWidth": "18rem"}}>
      <div className="p-1">
        <img src={poster} className="card-img-top" alt="...."/>
      </div>
      <div className="card-body">
        <h5 className="card-title">{series.title}</h5>
        <p className="card-text">{series.overview}</p>
        <p>{series.popularity.toFixed(2)}</p>
        <button onClick={() => addToFavourites(series)} className="btn btn-dark">Add Favourite</button>
      </div>
    </div>
  )
}
