import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {io, Socket} from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000/chat';

@Injectable({
    providedIn:'root'
})

export class SocketService{

private socket;
logged_in_user = localStorage.getItem('username');
user_role = localStorage.getItem('role');
constructor() {}

public initSocket():void{
    this.socket = io(SERVER_URL);
    this.socket.emit("start", this.logged_in_user, this.user_role);
}

public join_room(room):void{
    this.socket.emit("joinRoom", room);
}

public leave_room(room):void{
    this.socket.emit("leaveRoom", room);
}

public joined(next){
    this.socket.on("joined", res=>next(res));
}

public create_room(newroom){
    this.socket.emit("newRoom", newroom);
}

public req_current_users(room){
    this.socket.emit("currentUsers", room);
}

public get_current_users(next){
    this.socket.on("currentUsers", res=>next(res));
}

public req_room_list(){
    this.socket.emit("roomList", 'list please');
}

public get_room_list(next){
    this.socket.on("roomList", res=>next(res));
}

public notice(next){
    this.socket.on('notice', res=>next(res))
}

public send_message(message:string):void{
    this.socket.emit('message', message)
}

public get_message(next){
    this.socket.on('message', (message) =>next(message))
}

public add_user(room, user){
    this.socket.emit('addUser',room,user);
}

public remove_user(room, user){
    this.socket.emit('removeUser',room,user);
}

public req_user_list(){
    this.socket.emit("userList", 'list please');
}

public get_user_list(next){
    this.socket.on("userList", res=>next(res));
}
}