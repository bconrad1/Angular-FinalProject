import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Person} from '../person.model';
import { Router, NavigationEnd} from '@angular/router';
declare var ga:Function;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name: string;
  email :string;
  avatar: string;
  currentUser : Person[] =[] ;

  constructor(public authService: AuthService, private router: Router) { 

  }

  ngOnInit() {
        
        var userSettings = this.authService.getUserSettings();
        this.name = userSettings.name;
        this.avatar = userSettings.avatar;
      
        
  }



  updateProfile(){
      this.authService.updateInfo(this.name,this.authService.authState.email,this.avatar)
      //window.location.reload()
  }

  
    getImage(): string {
        return this.authService.imageUrl;
    }

   getName() :string{
      
      this.name =  this.authService.getDisplayName();
      return this.name;
    }
    
}
