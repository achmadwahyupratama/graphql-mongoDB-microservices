import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { GET_MOVIES, GET_MOVIE_BY_ID } from '../graphql/queries'
import { PUT_MOVIE } from '../graphql/mutations'
import { useHistory, useParams } from 'react-router'
import { favourites } from '../graphql/vars'

export default function EditMovie() {
  const history = useHistory()
  const {register, handleSubmit, formState: {errors}} = useForm()

  const [editMovie, { error: mutationError, loading: mutationLoading, data: newDataMovie }] = useMutation(PUT_MOVIE, { 
    refetchQueries: [ { query: GET_MOVIES }],
    onCompleted: (data) => {
      console.log(`edited: `, data);
      history.push('/')
    }  
  })

  const {movieId} = useParams()

  //query untuk dapat data awal
  const {loading: queryLoading, error: queryError, data: queryData} = useQuery(GET_MOVIE_BY_ID, {variables: {id: movieId}})


  if (queryLoading || mutationLoading) return null;
  if (queryError) return `Error Query! ${queryError}`;
  if (mutationError) return `Error Mutation! ${mutationError}`;


  const initialMovie = queryData.movieById
  const {_id, title, overview, popularity, poster_path, tags} = initialMovie

  
  const onSubmit = (data) => {
    const lastFavs = favourites() 
    const toEditMovie = {
      title: data.title,
      overview: data.overview,
      poster_path: data.poster_path,
      popularity: parseFloat(Number(data.popularity).toFixed(2)),
      tags: data.tags.split(',')
    }
    console.log(toEditMovie);
    editMovie({variables: {id:_id, title: toEditMovie.title, overview: toEditMovie.overview, poster_path: toEditMovie.poster_path, popularity: toEditMovie.popularity, tags: toEditMovie.tags}})
    const foundInFav = lastFavs.find(movie => movie._id === _id)
    if (foundInFav) {
      let cleanFavs = lastFavs.filter(movie => movie._id !== _id)
      let editedFavs = [...cleanFavs, {...toEditMovie, _id: _id} ]
      favourites(editedFavs)
    }
  };

  return (
    <div className="container mx-4">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        
        <input type="text" className="form-control my-3" placeholder="title" {...register("title", { required: true })} defaultValue={title}/>
        {errors.title && <span>This field is required</span>}
        
        <input type="text" className="form-control my-3" placeholder="overview" {...register("overview", { required: true })} defaultValue={overview}></input>
        {errors.overview && <span>This field is required</span>}

        <input type="text" className="form-control my-3" placeholder="poster url" {...register("poster_path", { required: true })} defaultValue={poster_path}></input>
        {errors.poster_path && <span>This field is required</span>}

        <input type="text" className="form-control my-3" placeholder="9.99" {...register("popularity", { required: true })} defaultValue={popularity}></input>
        {errors.popularity && <span>This field is required</span>}

        <input type="text" className="form-control my-3" placeholder="tag1,tag2,tag3" {...register("tags")} defaultValue={ tags.join(',') }></input>
        <button className="btn btn-secondary" type="submit">Edit Movie</button>
      </form>
    </div>
    // <div>
    //   <p>{JSON.stringify(movieToEdit)}</p>
    // </div>
  )
}
