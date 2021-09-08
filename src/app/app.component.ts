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
          console.log("Hello"); //Function that you want to call
        }
      });
    }
    //Change button names/ add different buttons for different permissions
  buttonClicked(){
    var userRole = localStorage.getItem('role');
    if(userRole != 'superAdmin'){
      alert("Insufficient priviledges");
      this.router.navigateByUrl('/');
    }
  }

  logOut(){
    this.LoggedIn = false;
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.setItem('loggedIn', 'false');
    
  }

  ngOnInit() {
  }
}


