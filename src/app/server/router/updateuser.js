//This route is responsible for updating the roles of a user

module.exports =  function(db,app){
    app.post('/updateuser',function(req,res){
        if(!req.body){
            return res.sendStatus(400);
        }

        //Read posted data
        userName = req.body.username;
        role = req.body.role;

        //Read db
        const collection = db.collection('Users');

        //Check role and use are valid
        if (role == "user" || role == "superAdmin" || role == "groupAdmin"){
            collection.find({'Username': userName}).count((err,count)=>{
                if (count != 0){
                    collection.updateOne({Username: userName}, {$set:{Role: role}},(err,dbres)=>{
                        res.send({"ok": true});
                    })
                }else{
                    res.send({"ok":false, "error": "User does not exist"});
                }
            })
        }else{
            res.send({"ok": false, "error": "Invalid role"});
        }

    })
}