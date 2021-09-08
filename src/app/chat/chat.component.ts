import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
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
  group = [{
    "name": "",
    "users": [],
    "groupassist": [],
    "channels": []
  }];

  y = "";

  x = {
    "name": "",
    "user": ""
  };

  Admin = false;

  constructor(private router:Router, private httpClient: HttpClient) {}


  createGroup(){
    this.httpClient.post<any>(BACKEND_URL + '/fetchgroups', [this.y, "create"], httpOptions)
    .subscribe({
      next: data => {
        if(data.ok == true){
          window.location.reload();
        }else{
          alert("Group already exists");
        }
    },
    error: error => {
        console.error('There was an error!');
    }
  });
  }

  removeGroup(){
    this.httpClient.post<any>(BACKEND_URL + '/fetchgroups', [this.y, "removeGroup"], httpOptions)
    .subscribe({
      next: data => {
        if(data.ok == true){
          window.location.reload();
        }else{
          alert("Group does not exist");
        }
    },
    error: error => {
        console.error('There was an error!');
    }
  });
  }

  addUserToGroup(){
    this.httpClient.post<any>(BACKEND_URL + '/fetchgroups', [this.x, "add"], httpOptions)
    .subscribe({
      next: data => {
        if(data.ok == true){
          window.location.reload();
        }else{
            if(data.reason == "User already exists in group"){
            alert("User already exists in group");
          }else if (data.reason == "Group does not exist"){
            alert("Group does not exist");
          }
        }
    },
    error: error => {
        console.error('There was an error!');
    }
  });
  }

  removeUserFromGroup(){
    this.httpClient.post<any>(BACKEND_URL + '/fetchgroups', [this.x, "remove"], httpOptions)
    .subscribe({
      next: data => {
        if(data.ok == true){
          window.location.reload();
        }
    },
    error: error => {
        console.error('There was an error!');
    }
  });
  }


  ngOnInit() {
    if(localStorage.getItem('role') == 'superAdmin'){
      this.Admin = true;
    }
    if(localStorage.getItem('role') != 'superAdmin'){
      this.Admin = false;
    }
    this.httpClient.post<any>(BACKEND_URL + '/fetchgroups', [this.group,"fetch"], httpOptions)
    .subscribe({
      next: data => {
        if(data.ok == true){
          for(let i = 0; i < data.groups.length; i++){
           this.group[i] = data.groups[i];
          }
          
          
        }
        
    },
    error: error => {
        console.error('There was an error!');
    }
  });
  }

}
