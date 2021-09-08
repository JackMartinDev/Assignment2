import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})

export class AdduserComponent implements OnInit {

  userInfo = {username: "", email: ""};
  
  constructor(private router:Router, private httpClient: HttpClient) {}

  public buttonClicked(){
    this.httpClient.post<any>(BACKEND_URL + '/adduser', this.userInfo, httpOptions)
    .subscribe({
      next: data => {
        if(data.ok == true){
          this.router.navigateByUrl('/chat');
        }else{
          alert("User Already exists");
        }
    },
    error: error => {
        console.error('There was an error!');
    }
  });
  }
  ngOnInit(){ }

}