module.exports = {
    connect: function(io, PORT){
        //read the DB for rooms
        var rooms = ["room1", "room2"];
        var socketRoom = [];
        var socketRoomNum = [];

        const chat = io.of('/chat');

        chat.on('connection',(socket)=>{

            console.log("YES");
            socket.on('message',(message)=>{
                console.log("message");
                for(i=0;i<socketRoom.length;i++){
                    if(socketRoom[i][0] == socket.id){
                        console.log("message2");
                        chat.to(socketRoom[i][1]).emit('message',message);
                    }
                }
            })
            
            socket.on('newRoom',(newRoom)=>{
                if(rooms.indexOf(newRoom) == -1){
                    rooms.push(newRoom);
                    chat.emit('roomList', JSON.stringify(rooms));
                }
            });

            socket.on('roomList',(m)=>{
                chat.emit('roomList',JSON.stringify(rooms))
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
    }
}