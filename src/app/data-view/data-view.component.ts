import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs/Observable';
import {Launch} from '../launch.model';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {
  launches: Observable<any[]>;
  launchesArray : Launch[] = [];

  constructor(private dataService: DataService) { 
      this.launches = this.dataService.getData();
      
     
        
      
  }

  ngOnInit() {
   
  }

}
