//This route is responsible for deleting users

module.exports =  function(db,app){
    app.post('/deleteuser',function(req,res){
        if(!req.body){
            return res.sendStatus(400);
        }

        userName =req.body.username;
        const collection = db.collection('Users');

        //maybe make it so logged in user cant be deleted idk
        collection.deleteOne({Username:userName},(err,dbres)=>{
            res.send({"ok": true});
        });
    })
}