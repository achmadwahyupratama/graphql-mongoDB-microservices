const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')
const movieUrl = 'http://localhost:4001/movies/'
const seriesUrl = 'http://localhost:4002/series/'


const Redis = require('ioredis');
const redis = new Redis();

const typeDefs = gql`
type Movie {
  _id: ID
  title: String
  overview: String
  poster_path: String
  popularity: Float
  tags: [String]
}

type Series {
  _id: ID
  title: String
  overview: String
  poster_path: String
  popularity: Float
  tags: [String]
}

type Success {
  message: String
}

type Query {
  movies: [Movie]
  movieById(id: ID) : Movie
  series: [Series]
  seriesById(id: ID) : Series 
}

type Mutation {
  createMovie(
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  ): Movie

  updateMovie(
    id: ID,
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  ): Success
  
  deleteMovieById(
    id: ID
  ): Success

  createSeries(
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  ): Series

  updateSeries(
    id: ID,
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  ): Success

  deleteSeriesById(
    id: ID
  ) : Success
}

`;

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const moviesFromCache = await redis.get("movies")
        moviesFromCache2 = JSON.parse(moviesFromCache)
        if (moviesFromCache2) {
          console.log('cache');
          return moviesFromCache2
        } else {
          return axios({
            url: movieUrl,
            method: 'GET'
          })
            .then(({data}) => {
              redis.set("movies", JSON.stringify(data))
              return data
            })
        }
      } catch (error) {
        console.log(error);
      }
    },
    movieById: async (parent, args) => {
      try {
        const idToFind = args.id
        const movieFromCache = await redis.get(`${idToFind}`)
        if (JSON.parse(movieFromCache)) {
          console.log('from cache');
          return JSON.parse(movieFromCache)
        } else {
          return axios({
            url: movieUrl + idToFind,
            method: 'GET'
          })
            .then(({data}) => {
              redis.set(`${idToFind}`, JSON.stringify(data))
              return data
            })
            .catch((err) => {
              throw err
            })
        }
      } catch (error) {
        console.log(error);
        return {error: error}
      }
    },
    series: async () => {
      try {
        const seriesFromCache = await redis.get("series")
        seriesFromCache2 = JSON.parse(seriesFromCache)
        if (seriesFromCache2) {
          console.log('cache');
          return seriesFromCache2
        } else {
          return axios({
            url: seriesUrl,
            method: 'GET'
          })
            .then(({data}) => {
              redis.set("series", JSON.stringify(data))
              return data
            })
        }
      } catch (error) {
        return {error: error}
      }
    },
    seriesById: async (parent, args) => {
      try {
        const idToFind = args.id
        const seriesFromCache = await redis.get(`${idToFind}`)
        if (JSON.parse(seriesFromCache)) {
          console.log('from Cache Series');
          return JSON.parse(seriesFromCache)
        } else {
          return axios({
            url: seriesUrl + idToFind,
            method: 'GET'
          })
            .then(({data}) => {
              redis.set(`${idToFind}`, JSON.stringify(data))
              return data
            })
            .catch((err) => {
              throw err
            })
        }
      } catch (error) {
        return {error: error}
      }
    },
  },
  Mutation: {
    createMovie: (parent, args) => {
      const newMovie = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags
      }
      // const {title, overview, poster_path, popularity, tags} = newMovie
      return axios({
        url: movieUrl,
        method: 'post',
        data: newMovie
      })
        .then(({ data }) => {
          redis.del("movies")
          return data.ops[0]
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateMovie: (parent, args) => {
      const reAssignMovie = {
        _id: args.id,
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags
      }
      const {_id, title, overview, poster_path, popularity, tags} = reAssignMovie
      return axios({
        url: movieUrl +_id,
        data: {
          title, overview, poster_path, popularity, tags
        },
        method : 'put'
      })
        .then((response) => {
          console.log(response);
          redis.del(`${_id}`)
          redis.del("movies")
          return response.data
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 404) {
            return ({message: 'NotFound'})
          }
          return err
        })
    },
    deleteMovieById: (parent, args) => {
      const idForDelete = args.id
      return axios({
        url: movieUrl + idForDelete,
        method: 'DELETE'
      })
        .then(({data}) => {
          redis.del(`${idForDelete}`)
          redis.del("movies")
          return data
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 404) {
            return ({message: 'NotFound'})
          }
          return err
        })
    },
    createSeries: (parent, args) => {
      const newSeries = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags
      }
      const {title, overview, poster_path, popularity, tags} = newSeries
      // console.log(newSeries);
      return axios({
        url: seriesUrl,
        method: "POST",
        data: newSeries
      })
        .then(({data}) => {
          redis.del("series")
          return data.ops[0]
        })
    },
    updateSeries: (parent, args) => {
      const reAssignSeries = {
        _id: args.id,
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags
      }
      const {_id, title, overview, poster_path, popularity, tags} = reAssignSeries
      return axios({
        url: seriesUrl +_id,
        method : 'PUT',
        data: {
          title, overview, poster_path, popularity, tags
        }})
        .then(({data}) => {
          console.log({data});
          redis.del(`${_id}`)
          redis.del("series")
          return data
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 404) {
            return ({message: 'NotFound'})
          }
          return err
        })
    },
    deleteSeriesById: (parent, args) => {
      const idForDelete = args.id
      return axios({
        url: seriesUrl + idForDelete,
        method: 'DELETE'
      })
        .then(({data}) => {
          redis.del(`${idForDelete}`)
          redis.del("series")
          return data
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 404) {
            return ({message: 'NotFound'})
          }
          return err
        })
    },
  }
}

const server = new ApolloServer({
  typeDefs, resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});