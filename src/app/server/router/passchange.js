//This route is responsible for adding new users

module.exports =  function(db,app){
    app.post('/passchange',function(req,res){
        if(!req.body){
            return res.sendStatus(400);
        }

        pass1 = req.body.pass1;
        pass2 = req.body.pass2;
        user = req.body.user;

        const collection = db.collection('Users');

        if(pass1 == pass2){
            console.log("hi");
            console.log(user);
            collection.updateOne({Username: user}, {$set:{Password: pass1}},(err,dbres)=>{
                res.send({"ok": true});
            })
        }else{
            res.send({"ok": false});
        }
    })
}
