const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Define a schema
const OrderModelSchema = new Schema({
  orderId: Number,
  price: Number,
  date: Date,
  bookIds: String,
})
// Export function to create "  cluster -> databse -> document name should be simple" model class
module.exports = mongoose.model('ordermodelschema', OrderModelSchema)
