const express = require('express')
const app = express()
const cors = require('cors')
const { connect, getDatabase } = require('./config/mongodb')
const port = process.env.PORT || 4001
const MoviesController = require('./controller/controller')
const moviesEndPoint = '/movies'
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get(moviesEndPoint, MoviesController.getAllMovies )
app.get(moviesEndPoint + '/:movieId', MoviesController.getOneMovie )
app.post(moviesEndPoint, MoviesController.createNewMovie)
app.put(moviesEndPoint + '/:movieId', MoviesController.putMovieById )
app.delete(moviesEndPoint + '/:movieId', MoviesController.delMovieById)

connect()
  .then(()=> {
    console.log('database ok');
    app.listen(port, ()=>{
      console.log('listening movies services on port ', port);
    })
  })
  .catch((err) => {
    console.log(err);
  })