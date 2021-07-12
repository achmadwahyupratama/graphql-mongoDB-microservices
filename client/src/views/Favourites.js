import { useQuery } from '@apollo/client'
import React from 'react'
import FavCard from '../components/FavCard'
import { GET_FAVOURITES } from '../graphql/queries'
import { favourites } from '../graphql/vars'

export default function Favourites() {
  const {loading, error, data} = useQuery( GET_FAVOURITES )
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  const favs = data.favourites
  // const favs = favourites()
  return (
    <div role="card-gallery" className="container d-flex flex-row justify-content-center flex-wrap">
      {
        favs.map((fav, idx)=> {
          return (<FavCard movie={fav} key={idx}/>)
        })
      }
      {/* <p>{JSON.stringify(favs)}</p> */}
    </div>
  )
}
