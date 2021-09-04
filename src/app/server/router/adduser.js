var fs = require('fs');

module.exports = function(req, res){
    var u = req.body.username;
    var e = req.body.email;
    var id = req.body.id;
    var r = req.body.role;
    fs.readFile('./users.json','utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            res.send({"ok":false});
        }
        var users = JSON.parse(jsonString);
        var newUser = {"username": u, "email": e,"id": id, "role": r};
        users.push(newUser);
        fs.writeFile('./users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) console.log('Error writing file:', err)
        })
        res.send({"ok":true});
    })
}