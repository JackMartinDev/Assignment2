module.exports = {
    connect: function(io, PORT){
        //read the DB for rooms
        const MongoClient = require('mongodb').MongoClient;
        const url = 'mongodb://localhost:27017';

        MongoClient.connect(url,function(err,client){
            if (err){
                return console.log(err)
            }
            const dbName = 'DB';
            const db = client.db(dbName);

            const collection = db.collection('Groups');
            const users_collection = db.collection('Users');

            var rooms = [];
            var socketRoom = [];
            var socketRoomNum = [];
            var user = "";

            const chat = io.of('/chat');

            chat.on('connection',(socket)=>{

                socket.on('start',(logged_in_user,user_role)=>{
                    user = logged_in_user;
                    var array = [];
                    collection.find().toArray((err,data)=>{
                        for(let i =0; i<data.length;i++){
                            if(data[i].GroupMembers.includes(logged_in_user) || user_role == "groupAdmin" || user_role == "superAdmin"){
                                array.push(data[i].GroupName);
                            }
                        }
                        rooms = array;
                        console.log(user);
                    });
                });

                socket.on('message',(message)=>{
                    for(i=0;i<socketRoom.length;i++){
                        if(socketRoom[i][0] == socket.id){
                            chat.to(socketRoom[i][1]).emit('message',message);
                        }
                    }
                })
                
                socket.on('newRoom',(newRoom)=>{
                    if(rooms.indexOf(newRoom) == -1){
                        rooms.push(newRoom);
                        chat.emit('roomList', JSON.stringify(rooms));
                        collection.insertOne({GroupName: newRoom, GroupMembers: ["Admin"], GroupAssist: ["Admin"]});
                    }
                });

                socket.on('roomList',(m)=>{
                    chat.emit('roomList',JSON.stringify(rooms))
                });

                socket.on('userList',(m)=>{
                    users_collection.find().toArray((err,data)=>{
                        users = [];
                        for(let i = 0; i<data.length;i++){
                            users[i] = data[i].Username;
                        }
                        chat.emit('userList',JSON.stringify(users))
                    });
                });

                socket.on('currentUsers',(room)=>{
                    var user_count = 0;

                    for(i=0;i<socketRoomNum.length;i++){
                        if(socketRoomNum[i][0]==room){
                            user_count = socketRoomNum[i][1];
                        }
                    }
                    chat.in(room).emit('currentUsers',user_count);
                });

                socket.on('joinRoom',(room)=>{
                    if(rooms.includes(room)){
                        socket.join(room);
                            
                            var in_room_socket_array = false;

                            for(i=0; i<socketRoom.length;i++){
                                if(socketRoom[i][0] == socket.id){
                                    socketRoom[i][1] = room;
                                    inroom = true;
                                }
                            }
                            
                            if(in_room_socket_array == false){
                                socketRoom.push([socket.id, room]);
                                var has_room_number = false;

                                for(let j=0; j<socketRoomNum.length;j++){
                                    if(socketRoomNum[j][0] == room){
                                        socketRoomNum[j][1] =  socketRoomNum[j][1]+1;
                                        has_room_number = true;
                                    }
                                }
                                if(has_room_number == false){
                                    socketRoomNum.push([room,1]);
                                }

                            }
                            chat.in(room).emit("notice", "A new user has joined the chat");
                        
                        chat.in(room).emit("joined",room);
                    }
                });

                socket.on("leaveRoom",(room)=>{
                    for(let i=0; i<socketRoom.length;i++){
                        if(socketRoom[i][0] == socket.id){
                            socketRoom.splice(i,1);
                            socket.leave(room);
                            chat.to(room).emit("notice", "A user has left the chat");
                        }
                    }

                    for(j=0; j<socketRoomNum.length;j++){
                        if(socketRoomNum[j][0]== room){
                            socketRoomNum[j][1] = socketRoomNum[j][1] - 1;
                            if(socketRoomNum[j][1]==0){
                                socketRoomNum.splice(j,1);
                            }
                        }
                    }
                });

                socket.on('addUser',(room, user)=>{
                    collection.find({GroupName:room}).toArray((err,data)=>{
                        var current_users = data[0].GroupMembers;
                        console.log(current_users);
                        current_users.push(user);
                        console.log(current_users);
                        collection.updateOne({GroupName: room}, {$set:{GroupMembers: current_users}})

                    });
                    collection.updateOne({GroupName: room}, {$set:{GroupMembers: [user]}},(err,dbres)=>{
                        console.log("done");
                    })
                });

                socket.on('disconnect',()=>{
                    socket.disconnect()
                    for(let i=0; i<socketRoom.length;i++){
                        if(socketRoom[i][0] == socket.id){
                            socketRoom.splice(i,1);
                        }
                    }
                    for(let j=0;j<socketRoomNum.length; j++){
                        if(socketRoomNum[j][0] == socket.room){
                            socketRoomNum[j[1] = socketRoomNum[j][1] - 1];
                        }
                    }
                    console.log("Disconnected");
                });
            });

            })

    }
}