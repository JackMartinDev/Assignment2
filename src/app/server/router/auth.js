//const User = require('../code/user.js');

var fs = require('fs');

module.exports = function(req, res){
    var u = req.body.username;

    fs.readFile('./users.json','utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        var users = JSON.parse(jsonString);
        let i = users.findIndex(user =>
            (u == user.username));
            if(i == -1){
                res.send({"ok":false});
            }
            else{
                console.log(users[i]);
                res.send({"ok": true, "users": users[i]});
            }
    })
}