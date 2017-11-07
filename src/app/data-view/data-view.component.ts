import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs/Observable';
interface Post{
    age: string;
    location: string;
    name: string;
}
@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {
  posts: Observable<Post[]>;

  constructor(private dataService: DataService) { 
   
     

 
  }

  ngOnInit() {
  }

}
