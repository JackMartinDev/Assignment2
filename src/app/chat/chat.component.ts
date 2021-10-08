import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { SocketService } from '../services/socket.service';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  private socket;
  messageContent:string="";
  messages:string[] = [];
  rooms = [];
  selectedRoom:string = "";
  roomNotice:string = "";
  currentRoom:string = "";
  isInRoom = false;
  newRoom:string = "";
  userCount:number = 0;
  users = ["Jack", "Dylan"];
  selectedRoomAdd:string = "";
  selectedUserAdd:string = "";

  constructor(private socketService:SocketService) {}


//On load check priviledges and fetch group data from the server
  ngOnInit() {
    this.socketService.initSocket();
    this.socketService.get_message((m)=>{this.messages.push(m)});
    this.socketService.req_room_list();
    this.socketService.get_room_list((msg)=>{this.rooms =  JSON.parse(msg)});
    this.socketService.notice((msg)=>{this.roomNotice = msg});
    this.socketService.joined((msg)=>{this.currentRoom = msg
    if(this.currentRoom !=""){
      this.isInRoom = true;
    }else{
      this.isInRoom = false;
    }
  });
}

  join_room(){
    this.socketService.join_room(this.selectedRoom);
    this.socketService.req_current_users(this.selectedRoom);
    this.socketService.get_current_users((res)=>{this.userCount = res});
  }
  
  clear_notice(){
    this.roomNotice = "";
  }

  leave_room(){
    this.socketService.leave_room(this.currentRoom);
    this.socketService.req_current_users(this.currentRoom);
    this.socketService.get_current_users((res)=>{this.userCount = res});
    this.selectedRoom = null;
    this.currentRoom = "";
    this.isInRoom = false;
    this.userCount = 0;
    this.roomNotice = "";
    this.messages = [];
  }
  
  create_room(){
    this.socketService.create_room(this.newRoom);
    this.socketService.req_room_list();
    this.newRoom = "";
  }

  chat(messageContent){
    if(messageContent){
      console.log(messageContent);
      this.socketService.send_message(messageContent);
      this.messageContent = null;
    }else{
      console.log("no message");
    }
  }

  add_user(selectedRoomAdd,selectedUserAdd){
    this.socketService.add_user(selectedRoomAdd,selectedUserAdd);
  }

}
