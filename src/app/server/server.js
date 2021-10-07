const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const io = require('socket.io')(http,{
    cors:{
    origin:"http://localhost:4200",
    methods: ["GET","POST"],
    credentials: true,
    allowEIO3: true
    },
    transport: ['websocket']
    });
const sockets = require('./socket.js');
var ObjectID = require('mongodb').ObjectId;

app.use(cors());
app.use(express.json());
const url = 'mongodb://localhost:27017';
sockets.connect(io, 3000);

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true},function(err,client){
    if (err){
        return console.log(err)
    }
    console.log("Connected successfully");
    var server = http.listen(3000, function(){
        console.log("Server listening on port 3000");
    })
    const dbName = 'DB';
    const db = client.db(dbName);

    const collection = db.collection("Users");
    collection.insertMany([{Username: "Admin", Email: "admin@gmail.com", Role: "superAdmin"},
    {Username: "Chloe", Email: "chloe@gmail.com", Role: "user"},
    {Username: "Jack", Email: "jack@gmail.com", Role: "groupAdmin"}]);

    //"username": u, "email": e,"id": idCount, "role": 'user'
    require('./router/auth.js')(db,app);
    require('./router/adduser.js')(db,app);
    require('./router/deleteuser.js')(db,app);
    require('./router/updateuser.js')(db,app);

    app.post('/auth', require('./router/auth'));
    app.post('/adduser', require('./router/adduser'));
    app.post('/deleteuser', require('./router/deleteuser'));
    app.post('/updateuser', require('./router/updateuser'));
    app.post('/fetchgroups', require('./router/fetchgroups'));


})