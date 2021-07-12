import { gql } from '@apollo/client'

export const GET_MOVIES = gql`
  query GetMovies {
    movies {
      title
      overview
      _id
      tags
      poster_path
      popularity
    }
  }
`

export const GET_SERIES = gql`
  query GetSeries {
    series {
      title
      overview
      _id
      tags
      poster_path
      popularity
    }
  }
`

export const GET_MOVIES_SERIES = gql`
  query GetMoviesSeries {
    movies {
      title
      overview
      _id
      tags
      poster_path
      popularity
    }
    series {
      title
      overview
      _id
      tags
      poster_path
      popularity
    }
  }
`

export const GET_MOVIE_BY_ID = gql`
  query GetMovieById($id: ID) {
    movieById(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_SERIES_BY_ID = gql`
  query GetSeriesById($id: ID) {
    seriesById(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_FAVOURITES = gql`
  query getFavourites {
    favourites @client
  }
`