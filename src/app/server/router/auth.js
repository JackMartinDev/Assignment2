//This route is responsible for authenticating the login user information

module.exports =  function(db,app){
    app.post('/auth',function(req,res){
        if(!req.body){
            return res.sendStatus(400);
        }

        //Read posted data
        userName = req.body.username;
        password = req.body.password;

        //Connect to db
        const collection = db.collection('Users');

        //Authenticate user 
        collection.find({'Username': userName}).count((err,count)=>{
            if (count != 0){
                collection.find({'Username': userName}).toArray((err,data)=>{
                    if(data[0].Password == password){
                        res.send({"ok":true, "user":data[0]});
                    }else{
                        res.send({"ok":false, "error": "Incorrect password"});
                    }
                    
                });
            }else{
                res.send({"ok":false, "error": "User does not exist"});
            }
        })
    })
}