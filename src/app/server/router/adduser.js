//This route is responsible for adding new users

module.exports =  function(db,app){
    app.post('/adduser',function(req,res){
        if(!req.body){
            return res.sendStatus(400);
        }

        userName = req.body.username;
        email = req.body.email;

        const collection = db.collection('Users');

        collection.find({'Username': userName}).count((err,count)=>{
            if (count == 0){
                collection.insertOne({Username: userName, Email: email, Role: "user", Password: "password"},(err,dbres)=>{
                    res.send({"ok": true});
                })
            }else{
                res.send({"ok":false});
            }
        })
    })
}