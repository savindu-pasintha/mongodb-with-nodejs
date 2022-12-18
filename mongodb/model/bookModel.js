const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define a schema
const BookModelSchema = new Schema({
  _id: Number,
  bookId: Number,
  name: String,
})

// Export function to create "BookModel" model class
//cluster -> databse -> document name should be simple" model class
module.exports = mongoose.model('bookmodelschema', BookModelSchema)
