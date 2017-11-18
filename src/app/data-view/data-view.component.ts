import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs/Observable';
import {Launch} from '../launch.model';
import {AuthService} from '../services/auth.service';
import {Summary} from './summary.modal';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {

  //New Laiunch


  flightNumber: string;
  launchYear: string;
  launchDate: string;
  rocketId: string;
  rocketName: string;
  rocketType: string;
  launchSite: string;
  payloadType: string;
  payloadCustomer: string;
  payloadMass: number;
  launchSuccess: boolean;
  launchLand: boolean;
  missionPatch: string;
  missionVideo: string;
  missionArticle:string;
  details: string;






  launches: Observable<any[]>;
  launchesArray : Launch[] = [];
  launchesOriginal : Launch[] = [];
  launchesDone: Observable<any[]>;

  filterCustomer: string;
  filterYear : string;
  filterRocket : string;

  summary : Summary = this.dataService.returnSummary();
  hide : boolean;
  summaryView = false;
  dataView = true;

  videoUrl: any;
  addLaunch : boolean = false;

  constructor(private dataService: DataService, authService: AuthService, private _sanitizer: DomSanitizer) { 
     
      console.log("constructing dataview")
      this.launchesOriginal = dataService.getData();
      this.launchesArray = this.launchesOriginal;
        
     
        
      
  }

  databaseLaunch(){

      var customerArray=[];

      if(this.payloadCustomer.includes(',')){
          var customers = this.payloadCustomer.split(',');
          customerArray = customers;
      }else{
          customerArray.push(this.payloadCustomer);
      }

      var launch = new Launch(this.flightNumber,this.launchYear,this.launchDate,this.rocketId,this.rocketName,this.rocketType,
                this.launchSite,this.payloadType, customerArray,this.payloadMass,this.launchSuccess, this.launchLand,
                this.missionPatch,this.missionVideo,this.missionPatch,this.details);

      this.dataService.addLaunch(launch);
      
  }

  ngOnInit() {
      this.launches = this.launchesDone;
     
  }

  showLaunch(){
      this.addLaunch = !this.addLaunch;
  }
  get getAddLaunch(){
      return this.addLaunch;
  }
  get getLaunches(){
    return this.launches;
  }

  filter(){
    
    var yearLength = this.filterYear;
    var customerLength = this.filterCustomer;
    var rocketLength = this.filterRocket;

    this.launchesArray = [];
    this.launchesOriginal.forEach(data => {

        var cust = data.payload_customer[0];
        var rock = data.rocket_name;
        var year = data.launch_year;
        

        if( yearLength !=null && customerLength !=null && rocketLength!=null){
                 
            if(cust ===this.filterCustomer && rock===this.filterRocket && this.filterYear ===year){
                this.launchesArray.push(data)
            }
        }
        else if(yearLength!=null && customerLength !=null){
            if(cust===this.filterCustomer && this.filterYear ===year){
                this.launchesArray.push(data)
            }
        }
        else if(yearLength!=null){
     
          if(this.filterYear === year){
                this.launchesArray.push(data)
            }
        }
        else if(customerLength !=null && rocketLength!=null){
          if(cust===this.filterCustomer && rock===this.filterRocket ){
                this.launchesArray.push(data)
            }
        }
        else if(customerLength !=null){
          if(cust===this.filterCustomer){
                this.launchesArray.push(data)
            }
        }
        else if(rocketLength !=null&& yearLength!=null){
          if(rock===this.filterRocket && this.filterYear ===year){
                this.launchesArray.push(data)
            }
        }
        else if(rocketLength!=null){
          if(rock===this.filterRocket ){
                this.launchesArray.push(data)
            }
          }
        else{
           this.launchesArray.push(data)
        }
        
  
    });

    
  }

  clearFilter(){
    this.launchesArray = this.launchesOriginal;
    this.filterCustomer = null;
    this.filterRocket = null;
    this.filterYear = null;
  }

  hideData(){
      this.dataView=false;
      this.summaryView =true;
      
  }

  hideSummary(){
      this.dataView=true;
      this.summaryView =false;
  }

  get getSummary(){
        this.summary = this.dataService.returnSummary();
        return this.summary;
       


  }

}
