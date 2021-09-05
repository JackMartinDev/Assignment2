import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

const BACKEND_URL = 'http://localhost:3000';


@Component({
  selector: 'app-upgradeuser',
  templateUrl: './upgradeuser.component.html',
  styleUrls: ['./upgradeuser.component.css']
})
export class UpgradeuserComponent implements OnInit {

  userInfo = {username: "", role: ""};
  
  constructor(private router:Router, private httpClient: HttpClient) {}

  public buttonClicked(){
    this.httpClient.post<any>(BACKEND_URL + '/updateuser', this.userInfo, httpOptions)
    .subscribe({
      next: data => {
        if(data.ok == true){
          alert(data.users.username + "'s role updated to " + data.users.role);
          this.router.navigateByUrl('/chat');
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