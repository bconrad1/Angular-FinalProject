import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  time : String;
  constructor(private router: Router, private auth: AuthService){

  };

  ngOnInit(){

  
    this.utcTime();
  }

  utcTime(): void {
    setInterval(() => {         //replaced function() by ()=>
      var myDate = new Date().toUTCString();
      this.time = myDate;
    }, 1000);  
  }

  loggedin(){
    console.log("checking")
    console.log(this.auth.authenticated);
  }
  
  logout(){
    this.auth.signOut();
  }
}
