//This route is responsible for deleting users

module.exports =  function(db,app){
    app.post('/deleteuser',function(req,res){
        if(!req.body){
            return res.sendStatus(400);
        }

        //Read Posted data
        userName =req.body.username;

        //Connect to db
        const collection = db.collection('Users');
        const groups_collection = db.collection('Groups');

        //Remove the user from groups
        groups_collection.update({}, {$pull: {"GroupMembers": { $in: [userName]}}},{multi: true})
        groups_collection.update({}, {$pull: {"GroupAdmins": { $in: [userName]}}},{multi: true})

        //Remove from database if exists
        collection.find({'Username': userName}).count((err,count)=>{
            if (count != 0){
                collection.deleteOne({Username:userName},(err,dbres)=>{
                    res.send({"ok": true});
                });
            }else{
                res.send({"ok":false});
            }
        })


    })
}
