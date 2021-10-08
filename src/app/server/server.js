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

var ObjectID = require('mongodb').ObjectId;
const sockets = require('./socket.js');
sockets.connect(io, 3000);

app.use(cors());
app.use(express.json());
const url = 'mongodb://localhost:27017';


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

    const users_collection = db.collection("Users");
    users_collection.insertMany([{Username: "Admin", Email: "admin@gmail.com", Role: "superAdmin"},
    {Username: "Chloe", Email: "chloe@gmail.com", Role: "user"},
    {Username: "Jack", Email: "jack@gmail.com", Role: "groupAdmin"}]);

    const groups_collection = db.collection("Groups");
    groups_collection.insertMany([{GroupName: "Group 1", GroupMembers: ["Jack", "Admin"], GroupAdmins: ["Admin"]},
    {GroupName: "Group 2", GroupMembers: ["Chloe", "Admin"], GroupAdmins: ["Chloe","Admin"]}]);



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