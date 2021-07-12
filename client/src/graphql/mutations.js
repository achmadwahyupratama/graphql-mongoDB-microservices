import { gql } from '@apollo/client'
export const ADD_MOVIE = gql`
  mutation addMovie($title: String, $overview: String, $poster_path: String, $popularity: Float, $tags: [String] ) {
    createMovie(title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const PUT_MOVIE = gql`
  mutation putMovie($title: String, $overview: String, $poster_path: String, $popularity: Float, $tags: [String], $id:ID) {
    updateMovie(title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags, id:$id) {
      message
    }
  }
`

export const DEL_MOVIE = gql`
  mutation delMovie($id: ID) {
    deleteMovieById(id: $id) {
      message
    }
  }
`