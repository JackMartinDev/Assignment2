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
  
  userpwd = {username: "", password: ""};

  constructor(private router:Router, private httpClient: HttpClient) {}

  //Post to server on button click
  public buttonClicked(){
    this.httpClient.post<any>(BACKEND_URL + '/auth', this.userpwd, httpOptions)
    .subscribe({
      next: data => {
        if(data.ok == true){
          
          //Add data to local storage
          localStorage.setItem('username', data.user.Username);
          localStorage.setItem('role', data.user.Role);
          localStorage.setItem('loggedIn', 'true');
          this.router.navigateByUrl('/chat').then(() => {
            window.location.reload();
          });
        }else{
          alert(data.error);
          
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