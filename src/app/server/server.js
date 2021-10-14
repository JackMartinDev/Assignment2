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


//Connect to sockets
const sockets = require('./socket.js');
sockets.connect(io, 3000);

//Use cors
app.use(cors());
app.use(express.json());

var ObjectID = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017';

//Connect to mongo db
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

    //Filler user data
    const users_collection = db.collection("Users");
    users_collection.insertMany([{Username: "Admin", Email: "admin@gmail.com", Role: "superAdmin", Password: "admin"},
    {Username: "Chloe", Email: "chloe@gmail.com", Role: "user", Password: "password"},
    {Username: "Jack", Email: "jack@gmail.com", Role: "groupAdmin", Password: "password"}]);

    //Filler group data
    const groups_collection = db.collection("Groups");
    groups_collection.insertMany([
    {GroupName: "Group 1", GroupMembers: ["Jack", "Admin"], GroupAssist: []},
    {GroupName: "Group 2", GroupMembers: ["Chloe", "Admin"], GroupAssist: []}]);

    //Routes
    require('./router/auth.js')(db,app);
    require('./router/passchange.js')(db,app);
    require('./router/adduser.js')(db,app);
    require('./router/deleteuser.js')(db,app);
    require('./router/updateuser.js')(db,app);

    app.post('/auth', require('./router/auth'));
    app.post('/passchange', require('./router/passchange'));
    app.post('/adduser', require('./router/adduser'));
    app.post('/deleteuser', require('./router/deleteuser'));
    app.post('/updateuser', require('./router/updateuser'));
})

