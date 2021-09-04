const User = require('../code/user.js');

var fs = require('fs');

var users = [];

let admin = new User("admin", "admin@gmail",1,"superAdmin");
let user1 = new User("user1", "user@gmail",2,"user");

users.push(admin);
users.push(user1);

module.exports = function(req, res){
    var u = req.body.username;

let i = users.findIndex(user =>
    (u == user.userName));
    if(i == -1){
        res.send({"ok":false});
    }
    else{
        console.log(users[i]);
        res.send({"ok": true, "users": users[i]});
    }
}