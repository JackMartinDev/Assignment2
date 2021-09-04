var express = require('express');
var app = express();

app.use(express.json());

var cors = require('cors');
app.use(cors());

app.use(express.static(__dirname + '/../dist/my-app'));

var http =  require("http").Server(app);
var server = http.listen(3000, function(){
    console.log("Server listening on port 3000");
})

app.post('/auth', require('./router/auth'));


