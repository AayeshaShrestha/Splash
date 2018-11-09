var mongoose = require('mongoose');

const StoriesSchema = mongoose.Schema({
  title : String,
  story : String,
  author : String,
  createDate : {
    type : Date,
    default : Date.now
  }
});

module.exports = mongoose.model('Stories', StoriesSchema);
