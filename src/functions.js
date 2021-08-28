var User = require('./user.js');

function addUser(user, username, email, id , role){
    if(user.role == "superAdmin"){
        let user = new User(username, email, id, role);
        return user;
    }else{
        console.log("INSUFFICIENT PERMISSIONS");
    }
}

function modifyRole(user, targetUser, role){
    if(user.role == "superAdmin"){
        targetUser.role = role;
    }else{
        console.log("INSUFFICIENT PERMISSIONS");
    }
}

function removeUser(){

}

function createGroup(){
    
}


module.exports = {
    addUser,
    modifyRole
}
