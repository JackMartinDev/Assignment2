var express = require('express');
var app = express();

var fs = require('fs');

app.use(express.json());

var cors = require('cors');
app.use(cors());

app.use(express.static(__dirname + '/../dist/my-app'));

var http =  require("http").Server(app);
var server = http.listen(3000, function(){
    console.log("Server listening on port 3000");
})

app.post('/auth', require('./router/auth'));
app.post('/adduser', require('./router/adduser'));
app.post('/deleteuser', require('./router/deleteuser'));


