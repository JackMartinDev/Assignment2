import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { timeStamp } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Assignment1';
  LoggedOut = true;
  constructor(private router:Router){
    
      this.router.events.subscribe((e) => {
        if (e instanceof NavigationEnd) {
          if(localStorage.getItem('loggedIn') == 'true'){
            this.LoggedOut = false;
            console.log(this.LoggedOut);
          }
          if(localStorage.getItem('loggedIn') == 'false'){
            this.LoggedOut = true;
            console.log(this.LoggedOut);
          }
          console.log("Hello"); //Function that you want to call
        }
      });
    }
  buttonClicked(){
    var userRole = localStorage.getItem('role');
    if(userRole != 'superAdmin'){
      alert("Insufficient priviledges");
      this.router.navigateByUrl('/');
    }
  }

  logOut(){
    this.LoggedOut = true;
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.setItem('loggedIn', 'false');
  }

  ngOnInit() {
    localStorage.setItem('loggedIn', 'false');
    localStorage.setItem("idCount", "2");
  }
}


