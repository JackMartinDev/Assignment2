//This route is responsible for adding new users

var fs = require('fs');
var idCount = 2;    //initial count to keep track of user id

module.exports = function(req, res){
    var u = req.body.username;
    var e = req.body.email;

    fs.readFile('./users.json','utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            res.send({"ok":false});
        }
        var users = JSON.parse(jsonString);
            let i = users.findIndex(user =>
            (u == user.username));
            if(i == -1){
                var newUser = {"username": u, "email": e,"id": idCount, "role": 'user'};
                users.push(newUser);
                fs.writeFile('./users.json', JSON.stringify(users, null, 2), (err) => {
                    if (err) console.log('Error writing file:', err)
                })
                idCount =  idCount + 1;
                console.log(idCount);
                res.send({"ok":true, "users": users[i]});
            }
            else{
                res.send({"ok": false});
            }
    })
}