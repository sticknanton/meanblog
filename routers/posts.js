var express = require('express');
var router = express.Router();
var Post = require('../models/post')

router.post('/', function (req, res) {
  var postData = req.body.post;
  var newPost = new Post(postData)
  newPost.save(function (err, dbPost) {
    res.json( dbPost );
  })
})
router.get('/', function (req, res) {
  dbPosts = Post.all;
  Post.find({}, function(err, dbPosts){
      res.json( {posts: dbPosts} );
    });
})

module.exports = router;
