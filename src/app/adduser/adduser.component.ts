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

  userInfo = {username: "", email: "", id: 2, role: ""};
  
  constructor(private router:Router, private httpClient: HttpClient) {}

  public buttonClicked(){
    this.httpClient.post<any>(BACKEND_URL + '/adduser', this.userInfo, httpOptions)
    .subscribe({
      next: data => {
        if(data.ok == true){
          var id = Number(sessionStorage.getItem("idCount"));
          var x = id + 1;
          var y = x.toString();
          sessionStorage.setItem("idCount", y);
          this.userInfo.id = x;
          //this.router.navigateByUrl('/chat');
        }else{
          alert("Error");
        }
    },
    error: error => {
        console.error('There was an error!');
    }
  });
  }
  ngOnInit(){
    sessionStorage.setItem("idCount", "2");
  }

}