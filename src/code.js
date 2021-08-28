const Functions = require('./functions.js');
const User = require('./user.js');


let admin = new User("admin", "admin@gmail",1,"superAdmin");

let user_1 = Functions.addUser(admin,"test","Test@gmail",2,"User");

console.log(user_1);

Functions.modifyRole(user_1,user_1,"Admin");

console.log(user_1);

