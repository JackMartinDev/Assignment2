import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})

export class PasswordComponent implements OnInit {
  pwd = {pass1: "", pass2: "", user: ""};
  constructor(private router:Router, private httpClient: HttpClient) { }

  public buttonClicked(){
    this.httpClient.post<any>(BACKEND_URL + '/passchange', this.pwd,httpOptions)
    .subscribe({
      next: data => {
        if(data.ok == true){
          this.router.navigateByUrl('/chat').then(() => {
            window.location.reload();
          });
        }else{
          alert("Passwords do not match");
        }
    },
    error: error => {
        console.error('There was an error!');
    }
  });
  }

  ngOnInit(): void {
    this.pwd.user = localStorage.getItem("username");
  }

}
