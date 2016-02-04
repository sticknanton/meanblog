var express       = require('express'),
    bodyParser    = require('body-parser'),
    cookieParser  = require('cookie-parser'),
    mongoose      = require('mongoose');


var app = express();
app.use(express.static('./public'));
app.use( bodyParser.urlencoded({extended: true}) );
app.use( bodyParser.json() );
app.use(cookieParser())
mongoose.connect('mongodb://localhost/mean-blog-02')


var users = require('./routers/users');
app.use('/api/users', users);
var posts = require('./routers/posts');
app.use('/api/posts', posts);

app.get('/', function(req, res){
 res.sendFile( __dirname + '/views/index.html');
})

var port = 8080;
app.listen(process.env.PORT || port, function(){
  console.log('...listening on ' + port);
});
