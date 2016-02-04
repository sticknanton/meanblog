var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
  author: {type: String},
  title: {type: String},
  content: {type: String}
});


module.exports = mongoose.model('Post', PostSchema);
