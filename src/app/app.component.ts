import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  time : String;
  constructor(private router: Router){

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

  
}
