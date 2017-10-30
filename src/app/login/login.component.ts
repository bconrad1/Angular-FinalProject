import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent{

  loginMessage : string;

  constructor(public authService: AuthService) { 
    
  }


  login(username : string, password: string): boolean {

      return false;

  }

  logout() : boolean {
    this.authService.logout();
    return false; 
  }

  
}
