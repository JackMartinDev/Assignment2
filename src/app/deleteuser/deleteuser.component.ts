import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})
export class DeleteuserComponent implements OnInit {

  userInfo = {username: ""};
  
  constructor(private router:Router, private httpClient: HttpClient) {}

  //Post to server on button click
  public buttonClicked(){
    this.httpClient.post<any>(BACKEND_URL + '/deleteuser', this.userInfo, httpOptions)
    .subscribe({
      next: data => {
        if(data.ok == true){
          this.router.navigateByUrl('/chat').then(() => {
            window.location.reload();
          });
        }else{
          alert("User does not exist");
        }
    },
    error: error => {
        console.error('There was an error!');
    }
  });
  }
  ngOnInit(){
  }
}