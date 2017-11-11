import {Injectable} from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Launch} from '../launch.model';
import {Http} from '@angular/http';
import {AngelFire} from '../services/angelfire.service';

@Injectable()
export class DataService {
    

    url : string = "https://api.spacexdata.com/v1/launches/"
    results : any;
    launches : Launch[] = [];
    firebaseCol : Observable<any[]>;
    constructor(private http: Http, private afs: AngularFirestore) {
        this.populateStore();

    }

    ngOnInit() {}  

    
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

        var launches = [];
    
        this.results.map(function(item){
            var flight_number = item['flight_number']
            var launch_year = item['launch_year'];
            var launch_date = item['launch_date_unix'];
            var rocket_id = item['rocket']['rocket_id'];
            var rocket_name = item['rocket']['rocket_name'];
            var rocket_type = item['rocket']['rocket_type'];
            var launch_site = item['launch_site']['site_name'];
            var payload_type = item['payloads'][0]['payload_type']
            var payload_customer = item['payloads'][0]['customers']
            var payload_mass_lbs = item['payloads'][0]['payload_mass_lbs'];
            var launch_success = item['launch_success'];
            var launch_land = item['land_success'];
            var mission_patch = item['links']['mission_patch'];
            var mission_video = item['links']['video_link'];
            var mission_article = item['links']['article_link'];
            var details = item['details'];

            var launch = new Launch(flight_number,launch_year,launch_date,rocket_id, rocket_name, rocket_type, launch_site,
                            payload_type, payload_customer, payload_mass_lbs, launch_success, launch_land, mission_patch,mission_video, mission_article,details);
            launches.push(launch)
            
            
        })
        this.launches = launches;
       // this.sendToFirebase()
       this.retrieveFromFirebase();
    }

    getResults(){
        return this.launches;
    }

    //Inital run 
    sendToFirebase(){

        
        for (let item of this.launches) {
            this.afs.collection('test').add({
                'flight_number':item.flight_number, 
                'launch_year':item.launch_year,
                'launch_date': item.launch_date,
                'rocket_id':item.rocket_id,
                'rocket_name':item.rocket_name,
                'rocket_type':item.rocket_type,
                'launch_site':item.launch_site,
                'payload_type':item.payload_type,
                'payload_customer':item.payload_customer,
                'payload_mass_lbs':item.payload_mass_lbs,
                'launch_success':item.launch_success,
                'launch_land':item.launch_success,
                'mission_patch':item.mission_patch,
                'mission_video':item.mission_video,
                'mission_article':item.mission_article,
                'details':item.details
        });
        }
        console.log(this.launches)
    }


    retrieveFromFirebase(){
        
        this.firebaseCol = this.afs.collection('launches').valueChanges();
        
    }

    getData(){
        return this.firebaseCol;
    }
}
