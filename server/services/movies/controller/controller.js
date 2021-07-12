const Movie = require('../model/movie')

class MoviesController{
  static async getAllMovies(req, res, next){
    try {
      const movies = await Movie.getAllMovies()
      console.log(movies);
      res.status(200).json(movies)
    } catch (error) {
      res.status(500).json({error: error})
    }
  }
  static async getOneMovie(req, res, next){
    try {
      const movieId = req.params.movieId
      const movie = await Movie.getOneMovie(movieId)
      console.log(movie);
      res.status(200).json(movie[0])
    } catch (error) {
      res.status(500).json({error: error})
    }
  }
  static async createNewMovie(req, res, next){
    try {
      const newMovie = {
        title: req.body.title, //string
        overview: req.body.overview, //string
        poster_path: req.body.poster_path, //string url
        popularity: Number(req.body.popularity), //double
        tags: req.body.tags //array
      }
      // console.log(newMovie);
      const createMovie = await Movie.addMovie(newMovie)
      res.status(201).json(createMovie)
    } catch (error) {
      res.status(500).json({error: error})
    }
  }
  static async putMovieById(req, res, next){
    try {
      const movieId = req.params.movieId
      const updateMovie = {
        title: req.body.title, //string
        overview: req.body.overview, //string
        poster_path: req.body.poster_path, //string url
        popularity: Number(req.body.popularity), //double
        tags: req.body.tags //array
      }
      // console.log( movieId, updateMovie ,'masuuuukk <<<<<<<<<<<<<<<<<<<<<<<');
      const updating = await Movie.putMovieById(movieId, updateMovie)
      if (updating.result.ok === 1 && updating.result.nModified === 1) {
        res.status(200).json({message: 'Success update document'})
      } else {
        res.status(404).json({error: 'Not Found'})
      }
    } catch (error) {
      res.status(500).json({error: error})
    }
  }
  static async delMovieById (req, res, next){
    try {
      const movieId = req.params.movieId
      const deleting = await Movie.delMovieById(movieId)
      if (deleting.result.n === 1) {
        res.status(200).json({message: 'Success deleted document with id '+ movieId})
      } else {
        res.status(404).json({error: 'Not Found'})
      }
    } catch (error) {
      res.status(500).json({error: error})
    }
  }
}

module.exports = MoviesController