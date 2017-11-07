import {Injectable} from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Launch} from '../launch.model';
import {Http} from '@angular/http';
import {AngelFire} from '../services/angelfire.service';
interface Post{
    age: string;
    location: string;
    name: string;
}

@Injectable()
export class DataService {
    

    url : string = "https://api.spacexdata.com/v1/launches/"
    results : any;
    constructor(private http: Http) {
        this.populateStore();

    }
    ngOnInit() {  }  

    
    populateStore(){
        var results;
        this.getJSON().then(data => {
            this.results = data;
            this.parseJSON();
        }, error => console.log(error));
    }

    public getJSON(){
         return this.http.get(this.url)
                        .toPromise()
                        .then(res => res.json());
         }

    parseJSON(){

        

        this.results.map(function(item){
            var flight_number = item['flight_number'];
            var launch_year = item['launch_year'];
            var launch_date = item['launch_date_unix'];
            var rocket_id = item['rocket']['rocket_id'];
            var rocket_name = item['rocket']['rocket_name'];
            var rocket_type = item['rocket']['rocket_type'];
            var launch_site = item['launch_site']['site_name'];
            var payload_type = item['payloads']['payload_type'];
            //var payload_customer = item['payloads'];
            var payload_mass_lbs = item['payloads']['payload_mass_lbs'];
            var launch_success = item['launch_success'];
            var launch_land = item['land_success'];
            var mission_patch = item['links']['mission_patch'];
            var mission_video = item['links']['video_link'];
            var mission_article = item['links']['article_link'];
            var details = item['details'];

            console.log(details + " " + mission_patch)
            
        })
    }
}