var express = require('express');
var router = express.Router();
var Post = require('../models/post')

router.post('/', function (req, res) {
  var postData = req.body.post;
  console.log(postData);
  var newPost = new Post(postData)
  newPost.save(function (err, dbPost) {
    res.json( dbPost );
  })
})
router.get('/', function (req, res) {
  dbPosts = Post.all;
  console.log(dbPosts);
  Post.find({}, function(err, dbPosts){
      res.json( {posts: dbPosts} );
    });
})

module.exports = router;
