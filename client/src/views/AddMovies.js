import { useMutation } from '@apollo/client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ADD_MOVIE } from '../graphql/mutations'
import { useHistory } from 'react-router-dom'
import { GET_MOVIES } from '../graphql/queries'


export default function AddMovies() {
  const history = useHistory()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [addMovie, { error: errorMutation, loading: loadingMutation, data: insertMovie }] = useMutation( ADD_MOVIE, { 
    refetchQueries: [
      {
        query: GET_MOVIES
      }
    ],
    onCompleted: (data) => {
      console.log(data, 'created');
      history.push('/')
    }
  } )
  const onSubmit = (data) => {
    const newMovie = {
      title: data.title,
      overview: data.overview,
      poster_path: data.poster_path,
      popularity: parseFloat(Number(data.popularity).toFixed(2)),
      tags: data.tags.split(',')
    }
    addMovie({variables: {title: newMovie.title, overview: newMovie.overview, poster_path: newMovie.poster_path, popularity: newMovie.popularity, tags: newMovie.tags}})
  };

  if (loadingMutation) return `adding data`
  if (errorMutation) return `Error Mutation ${errorMutation}`

  return (
    <div className="conntainer mx-4">
      <form className="form p-2" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" className="form-control my-3" placeholder="title" {...register("title", { required: true })} />
        {errors.title && <span>This field is required</span>}
        <input type="text" className="form-control my-3" placeholder="overview" {...register("overview", { required: true })}></input>
        {errors.overview && <span>This field is required</span>}
        <input type="text" className="form-control my-3" placeholder="poster url" {...register("poster_path", { required: true })}></input>
        {errors.poster_path && <span>This field is required</span>}
        <input type="text" className="form-control my-3" placeholder="Popularity ex: 9.99" {...register("popularity", { required: true })}></input>
        {errors.popularity && <span>This field is required</span>}
        <input type="text" className="form-control my-3" placeholder="tag1,tag2,tag3" {...register("tags")}></input>
        <button className="btn btn-secondary" type="submit">add Movie</button>
      </form>
    </div>
  )
}
