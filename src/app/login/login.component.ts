import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { DataService} from '../services/data.service';
import { Router, NavigationEnd } from '@angular/router';
declare let ga: Function;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent{

  loginMessage : string;
  password: string;
  email : string; 
 

  constructor(private router: Router, public authService: AuthService, private dataService: DataService) { 
               
       this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            ga('set', 'page', event.urlAfterRedirects);
            ga('send', 'pageview');
          }
    });
  }

  login(): void {
      console.log('test')
      console.log(this.password)
      this.authService.emailLogin(this.email, this.password).then(data => this.router.navigateByUrl('home'));
     
    };

  loggedIn():boolean{
    
    return this.authService.authenticated;
    
  }

  logout(){
    this.authService.signOut();
  }

  create(){
      this.authService.emailSignUp(this.email, this.password).then(data => this.router.navigateByUrl('home'))
  }

  
}
