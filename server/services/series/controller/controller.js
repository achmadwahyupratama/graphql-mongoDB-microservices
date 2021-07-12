const Series = require('../model/series')

class SeriesController {
  static async getAllSeries(req, res, next){
    try {
      const series = await Series.getAllSeries()
      res.status(200).json(series)
    } catch (error) {
      res.status(500).json({error: error})
    }
  }
  static async getOneSeries(req, res, next){
    try {
      const seriesId = req.params.seriesId
      const series = await Series.getOneSeries(seriesId)
      res.status(200).json(series[0])
    } catch (error) {
      res.status(500).json({error: error})
    }
  }
  static async createNewSeries(req, res, next){
    try {
      const newSeries = {
        title: req.body.title, //string
        overview: req.body.overview, //string
        poster_path: req.body.poster_path, //string url
        popularity: Number(req.body.popularity), //double
        tags: req.body.tags //array
      }
      const createSeries = await Series.addSeries(newSeries)
      res.status(201).json(createSeries)
    } catch (error) {
      res.status(500).json({error: error})
    }
  }
  static async putSeriesById(req, res, next){
    try {
      const seriesId = req.params.seriesId
      const updateSeries = {
        title: req.body.title, //string
        overview: req.body.overview, //string
        poster_path: req.body.poster_path, //string url
        popularity: Number(req.body.popularity), //double
        tags: req.body.tags //array
      }
      const updating = await Series.putSeriesById(seriesId, updateSeries)
      if (updating.result.ok === 1 && updating.result.nModified === 1) {
        res.status(200).json({message: 'Success update series'})
      } else {
        res.status(404).json({error: 'Not Found'})
      }
    } catch (error) {
      res.status(500).json({error: error})
    }
  }
  static async delSeriesById (req, res, next){
    try {
      const seriesId = req.params.seriesId
      const deleting = await Series.delSeriesById(seriesId)
      if (deleting.result.n === 1) {
        res.status(200).json({message: 'Success deleted document with id '+ seriesId})
      } else {
        res.status(404).json({error: 'Not Found'})
      }
    } catch (error) {
      res.status(500).json({error: error})
    }
  }
}

module.exports = SeriesController