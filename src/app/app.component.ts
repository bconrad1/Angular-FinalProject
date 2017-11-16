import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  time : string;
  signedIn : boolean;
  avatar: string;
  name: string;
  

  constructor(private router: Router, private auth: AuthService){
      
       
      if (this.router.url != 'home' && this.router.url != 'dashboard' && this.router.url != 'login' ) {
        this.router.navigateByUrl("home")

      }
      
    
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

  
  get getAvatar(): string{
       if(this.auth.authenticated){
        var settings = this.auth.getUserSettings();
         this.avatar = settings.avatar;
         return this.avatar;
       }
  }

  logout(){
    this.auth.signOut();
    this.router.navigateByUrl('login');
  }




}
