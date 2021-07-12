const { getDatabase } = require("../config/mongodb");
const {ObjectId} = require('mongodb')
const series = 'tvSeries'

class Series {
  static addSeries (instance) {
    return getDatabase().collection(series).insertOne(instance)
  }
  static getAllSeries () {
    return getDatabase().collection(series).find().toArray()
  }
  static getOneSeries (seriesId) {
    return getDatabase().collection(series).find({_id: ObjectId(seriesId)}).toArray()
  }
  static putSeriesById (seriesId, instance) {
    return getDatabase().collection(series).updateOne({_id: ObjectId(seriesId)}, {$set: instance})
  }
  static delSeriesById (seriesId) {
    return getDatabase().collection(series).remove({_id: ObjectId(seriesId)})
  }
}

module.exports = Series