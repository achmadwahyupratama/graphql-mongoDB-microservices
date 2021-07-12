const express = require('express')
const app = express()
const cors = require('cors')
const { connect, getDatabase } = require('./config/mongodb')
const port = process.env.PORT || 4002
const seriesEndPoint = '/series'
const SeriesController = require('./controller/controller')
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get(seriesEndPoint, SeriesController.getAllSeries)
app.get(seriesEndPoint + '/:seriesId', SeriesController.getOneSeries)
app.post(seriesEndPoint, SeriesController.createNewSeries)
app.put(seriesEndPoint + '/:seriesId', SeriesController.putSeriesById)
app.delete(seriesEndPoint + '/:seriesId', SeriesController.delSeriesById)

connect()
  .then(()=> {
    console.log('database ok');
    app.listen(port, ()=>{
      console.log('listening series services on port ', port);
    })
  })
  .catch((err) => {
    console.log(err);
  })