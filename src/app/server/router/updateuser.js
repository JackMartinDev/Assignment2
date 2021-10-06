//This route is responsible for updating the roles of a user

module.exports =  function(db,app){
    app.post('/updateuser',function(req,res){
        if(!req.body){
            return res.sendStatus(400);
        }
        userName = req.body.username;
        role = req.body.role;

        const collection = db.collection('Users');
        collection.updateOne({Username: userName}, {$set:{Role: role}},(err,dbres)=>{
            res.send({"ok": true});
        })
    })
}