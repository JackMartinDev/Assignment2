import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  userpwd = {username: ""};
  value = false;
  constructor(private router:Router, private httpClient: HttpClient) {}

  public buttonClicked(){
    this.httpClient.post<any>(BACKEND_URL + '/auth', this.userpwd, httpOptions)
    .subscribe({
      next: data => {
        if(data.ok == true){
          console.log(data.users.userName);
          
          //Add data to local storage
          console.log("LOG IN");
          this.router.navigateByUrl('/chat');
        }else{
          alert("Incorrect login");
        }
        
    },
    error: error => {
        console.error('There was an error!');
    }
  });

  
  }

  ngOnInit(): void {
   
  }

}