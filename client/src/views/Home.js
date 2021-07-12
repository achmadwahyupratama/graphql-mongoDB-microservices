import React from 'react'
import MovieCard from '../components/MovieCard'
import SeriesCard from '../components/SeriesCard'
import { useQuery } from '@apollo/client'
import {/*  GET_MOVIES, GET_SERIES, */ GET_MOVIES_SERIES} from '../graphql/queries'

export default function Home() {
  // const { loading: moviesLoading, error: moviesError, data: moviesData } = useQuery(GET_MOVIES)
  // const { loading: seriesLoading, error: seriesError, data: seriesData } = useQuery(GET_SERIES)
  const {loading, error, data} = useQuery(GET_MOVIES_SERIES)
  
  if (/* moviesLoading || seriesLoading || */loading) return <p>Loading...</p>
  // if (moviesError) return <p>Error : {moviesError}</p>
  // if (seriesError) return <p>Error : {seriesError}</p>

  if (error) return <p>Error : {error}</p>
  // const movies = moviesData.movies
  // const series = seriesData.series
  const movies = data.movies
  const series = data.series
  return (
    <div>
      <div>
        <h1>Movies</h1>
        <div role="card-gallery" className="container d-flex flex-row justify-content-center flex-wrap">
          {
            movies.map((movie, idx)=> {
              return (<MovieCard movie={movie} key={idx}/>)
            })
          }
        </div>
      </div>
      <div>
        <h1>Series</h1>
        <div role="card-gallery" className="container d-flex flex-row justify-content-center flex-wrap">
          {
            series.map((series, idx)=> {
              return (<SeriesCard series={series} key={idx}/>)
            })
          }
        </div>
      </div>
    </div>
  )
}
