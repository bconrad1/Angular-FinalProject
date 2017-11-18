import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { DataService} from '../services/data.service';
import { Router, NavigationEnd } from '@angular/router';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
declare var ga: Function;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})


export class LoginComponent{

  loginMessage : string;
  password: string;
  email : string; 
  loginError: boolean = false;
  registering : boolean= false;
  avatar : string;
  display: string;

  constructor(private router: Router, public authService: AuthService, private dataService: DataService) { 
               
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
     //ga('send', { test: 'event', eventCategory: 'finalCSC436', eventAction: 'login', eventLabel: 'success'});
     console.log('constructing login');
    
  }



  login(): void {
      this.authService.emailLogin(this.email, this.password).then(data => {
          

      }).catch((err) => this.loginError=true);
        
      
    };

  loggedIn():boolean{
    
    return this.authService.authenticated;
    
  }

  logout(){
    this.authService.signOut();
    this.router.navigateByUrl('login');
  }

  create(){
      this.authService.emailSignUp(this.email, this.password, this.display, this.avatar)
          .then(data => {
            
            this.router.navigateByUrl('home')
          
        })
          .catch((err) => {

          });
      
  }

  get isRegistering(){
       return this.registering;   
  }

  register(){
    this.registering = true;
  }
  
}
