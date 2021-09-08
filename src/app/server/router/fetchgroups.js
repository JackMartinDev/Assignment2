//This route is responsible for dealing with all group related requests

var fs = require('fs');

module.exports = function(req,res){
    var check = req.body[1];    //check variable determines which statement gets run
    var data = req.body[0];     //user data

    //return all group data to the client
    if(check == 'fetch'){
    fs.readFile('./groups.json','utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        groups = JSON.parse(jsonString);
        res.send({"ok": true, "groups": groups});
    })}
    //Create a new server based on the data sent from the client
    else if(check == 'create'){
        fs.readFile('./groups.json','utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err)
                return
            }
            var groups = JSON.parse(jsonString);
            let i = groups.findIndex(group =>
            (data == group.name));
            if(i == -1){
                var newGroup = {"name": data, "users": ["admin"],"groupassist": [], "channels": []};
                groups.push(newGroup);
                fs.writeFile('./groups.json', JSON.stringify(groups, null, 2), (err) => {
                    if (err) console.log('Error writing file:', err)
                })
                res.send({"ok":true, "groups": groups});
            }else{
                res.send({"ok":false});
            }
        })
    }
    //Remove a group
    else if(check == 'removeGroup'){
        fs.readFile('./groups.json','utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err)
                return
            }
            var groups = JSON.parse(jsonString);
            let i = groups.findIndex(group =>
            (data == group.name));
            if(i == -1){
                res.send({"ok":false});
            }else{
                groups.splice(i,1);
                fs.writeFile('./groups.json', JSON.stringify(groups, null, 2), (err) => {
                    if (err) console.log('Error writing file:', err)
                })
                res.send({"ok":true, "groups": groups});
            }
        })
    }
    //Add user to a group
    else if(check == "add"){
        fs.readFile('./groups.json','utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err)
                return
            }
            var groups = JSON.parse(jsonString);
            let i = groups.findIndex(group =>
            (data.name == group.name));
            if(i == -1){
                res.send({"ok": false, "reason": "Group does not exist"});
            }else{
                let j = groups[i].users.findIndex(user =>
                    (data.user == user));
                    if(j == -1){
                        var users1 = groups[i].users;
                        users1.push(data.user);
                        //console.log(groups[i].users);
                        fs.writeFile('./groups.json', JSON.stringify(groups, null, 2), (err) => {
                            if (err) console.log('Error writing file:', err)
                        })
                        res.send({"ok":true, "groups": groups});
                        
                    }else{
                        res.send({"ok":false, "reason": "User already exists in group"});
                    }
            }
        })
    }
    //Remove user from a group
    else if(check == "remove"){
        fs.readFile('./groups.json','utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err)
                return
            }
            var groups = JSON.parse(jsonString);
            let i = groups.findIndex(group =>
            (data.name == group.name));
            if(i == -1){
            }else{
                let j = groups[i].users.findIndex(user =>
                (data.user == user));
                if(j == -1){
                    res.send({"ok":false});
                    console.log("Hello1");
                }else{
                    console.log("Hello");
                var users1 = groups[i].users;
                users1.splice(j,1);
                //console.log(groups[i].users);
                fs.writeFile('./groups.json', JSON.stringify(groups, null, 2), (err) => {
                    if (err) console.log('Error writing file:', err)
                })
                res.send({"ok":true, "groups": groups});
                }
            }
        })
    }
}