var mongoose = require('mongoose');
var sectionSchema = mongoose.Schema({
  name: String,
  availableSeats: Number,
    maxSeats: Number,
  courseId: Number,
  students: [String]
}, {collection: 'section'});
module.exports = sectionSchema;