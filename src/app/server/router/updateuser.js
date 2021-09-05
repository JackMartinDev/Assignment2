var fs = require('fs');

module.exports = function(req, res){
    var u = req.body.username;
    var e = req.body.role;

    fs.readFile('./users.json','utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            res.send({"ok":false});
        }
        var users = JSON.parse(jsonString);
            let i = users.findIndex(user =>
            (u == user.username));
            if(i == -1){
                res.send({"ok": false});
            }
            else{            
                users[i].role = e;
                fs.writeFile('./users.json', JSON.stringify(users, null, 2), (err) => {
                    if (err) console.log('Error writing file:', err)
                })
                res.send({"ok":true, "users": users[i]});
            }
    })
}