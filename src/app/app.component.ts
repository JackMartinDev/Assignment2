import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Assignment1';
  LoggedIn = false;
  Admin = false;
  constructor(private router:Router){
    
      this.router.events.subscribe((e) => {
        if (e instanceof NavigationEnd) {
          if(localStorage.getItem('loggedIn') == 'true'){
            this.LoggedIn = true;
            console.log(this.LoggedIn);
          }
          if(localStorage.getItem('loggedIn') == 'false'){
            this.LoggedIn = false;
            console.log(this.LoggedIn);
          }
          if(localStorage.getItem('role') == 'superAdmin'){
            this.Admin = true;
          }
          if(localStorage.getItem('role') != 'superAdmin'){
            this.Admin = false;
          }
        }
      });
    }
    
  //Disallow button press unless admin
  buttonClicked(){
    var userRole = localStorage.getItem('role');
    if(userRole != 'superAdmin'){
      alert("Insufficient priviledges");
      this.router.navigateByUrl('/');
    }
  }

  //Logout and clear all local storage
  logOut(){
    this.LoggedIn = false;
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.setItem('loggedIn', 'false');
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {

  }
}


