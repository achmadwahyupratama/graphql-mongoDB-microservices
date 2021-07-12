const { ObjectId } = require ('mongodb')
const { getDatabase } = require('../config/mongodb')
const movies = 'movies'

class Movie {
  static addMovie (instance) {
    return getDatabase().collection(movies).insertOne(instance)
  }
  static getAllMovies () {
    return getDatabase().collection(movies).find().toArray()
  }
  static getOneMovie (movieId) {
    return getDatabase().collection(movies).find({_id: ObjectId(movieId)}).toArray()
  }
  static putMovieById (movieId, instance) {
    return getDatabase().collection(movies).updateOne({_id: ObjectId(movieId)}, {$set: instance})
  }
  static delMovieById (movieId) {
    return getDatabase().collection(movies).deleteOne({_id: ObjectId(movieId)})
  }
}

module.exports = Movie