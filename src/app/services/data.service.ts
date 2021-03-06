import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Launch } from '../launch.model';
import { Http } from '@angular/http';
import { Summary } from '../data-view/summary.modal';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataService {


    url: string = "https://api.spacexdata.com/v1/launches/"
    results: any;
    launches: Launch[] = [];
    firebaseCol: Observable<any[]>;

    returnData: any[];
    summary: Summary;
    videoUrl: any;
    summaryServe: Subject<Summary> = new Subject<Summary>();
    constructor(private http: Http, private afs: AngularFirestore, private _sanitizer: DomSanitizer) {

        //  --  Used to Pull initial list from JSON -- // 
        this.populateStore();
        this.summaryServe.subscribe((value) => {
            this.summary = value;
        })

    

    }

    ngOnInit() { }


    populateStore() {
        var results;
        this.getJSON().then(data => {
            this.results = data;
            this.parseJSON();

        }, error => console.log(error));
    }

    public getJSON() {
        return this.http.get(this.url)
            .toPromise()
            .then(res => res.json());
    }

    parseJSON() {

        var launches = [];

        this.results.map(function (item) {
            var flight_number = item['flight_number']
            var launch_year = item['launch_year'];


            var date = new Date(item['launch_date_unix'] * 1000);
            var yyyy = date.getFullYear();
            var dd = ('0' + date.getDate()).slice(-2);
            var mm = ('0' + (date.getMonth() + 1)).slice(-2);
            var launch_date = mm + "/" + dd + "/" + yyyy;


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

            var launch = new Launch(flight_number, launch_year, launch_date, rocket_id, rocket_name, rocket_type, launch_site,
                payload_type, payload_customer, payload_mass_lbs, launch_success, launch_land, mission_patch, mission_video, mission_article, details, false);
            launches.push(launch)
        })
        this.launches = launches;
        this.getSummary();
        this.retrieveFromFirebase();
        //this.sendToFirebase()

    }

    getResults() {
        return this.launches;
    }
    addLaunch(launch: Launch) {

        this.afs.collection('launches').add({
            'flight_number': launch.flight_number,
            'launch_year': launch.launch_year,
            'launch_date': launch.launch_date,
            'rocket_id': launch.rocket_id,
            'rocket_name': launch.rocket_name,
            'rocket_type': launch.rocket_type,
            'launch_site': launch.launch_site,
            'payload_type': launch.payload_type,
            'payload_customer': launch.payload_customer,
            'payload_mass_lbs': launch.payload_mass_lbs,
            'launch_success': launch.launch_success,
            'launch_land': launch.launch_success,
            'mission_patch': launch.mission_patch,
            'mission_video': launch.mission_video,
            'mission_article': launch.mission_article,
            'details': launch.details
        }).then((res) => {
            console.log("adding")
            this.launches.push(new Launch(launch.flight_number, launch.launch_year, launch.launch_date, launch.rocket_id, launch.rocket_name, launch.rocket_type,
                launch.launch_site, launch.payload_type, launch.payload_customer, launch.payload_mass_lbs, launch.launch_success, launch.launch_land, launch.mission_patch,
                launch.mission_video, launch.mission_article, launch.details, false))
                location.reload();
        }).catch(err => console.log(err));
    }

    //Inital run 
    sendToFirebase() {


        for (let item of this.launches) {
            this.afs.collection('launches').add({
                'flight_number': item.flight_number,
                'launch_year': item.launch_year,
                'launch_date': item.launch_date,
                'rocket_id': item.rocket_id,
                'rocket_name': item.rocket_name,
                'rocket_type': item.rocket_type,
                'launch_site': item.launch_site,
                'payload_type': item.payload_type,
                'payload_customer': item.payload_customer,
                'payload_mass_lbs': item.payload_mass_lbs,
                'launch_success': item.launch_success,
                'launch_land': item.launch_success,
                'mission_patch': item.mission_patch,
                'mission_video': item.mission_video,
                'mission_article': item.mission_article,
                'details': item.details
            });
        }


    }


    retrieveFromFirebase() {
        var returnData = [];
        this.firebaseCol = this.afs.collection('launches').valueChanges();
        this.firebaseCol.forEach(data => {
            data.forEach(e => {
                returnData.push(e);
            })
        })
        this.launches = returnData;

    }

    getData() {
        return this.launches;
    }

    //Get Number of launches
    getLaunchesPer(customer) {
        var count = 0


        for (let item of this.launches) {
            
            for(let i of item.payload_customer){      
                       
                if (i === customer) {
                    count += 1;
                }
            }
        }
        return count;
    }


    getSummary() {

        var currentMax: Summary;
        var tempLaunches = this.launches;
        var maxFlight = 1;

        for (let data of tempLaunches) {

            if (Number(data.flight_number) > maxFlight) {
                currentMax = new Summary(data.launch_date, data.launch_year, data.payload_customer, data.payload_type, data.mission_patch, data.mission_video, data.flight_number, data.mission_article);

            }
        }

        var baseUrl = 'https://www.youtube.com/embed/';
        var videoID = currentMax.video.split("https://www.youtube.com/watch?v=")[1];
        var url = baseUrl + videoID;
        currentMax.video = this._sanitizer.bypassSecurityTrustResourceUrl(baseUrl + videoID)
        this.summary = currentMax;
        this.summaryServe.next(this.summary);
    }

    returnSummary() {
        return this.summary;


    }

    changeSummary(flightNum: string) {
        var tempLaunches = this.launches;

        this.launches.find((o, i) => {

            if (o.flight_number == flightNum) {

                this.summary = new Summary(o.launch_date, o.launch_year, o.payload_customer, o.payload_type, o.mission_patch, o.mission_video, o.flight_number, o.mission_article)

                var baseUrl = 'https://www.youtube.com/embed/';
                var videoID = this.summary.video.split("https://www.youtube.com/watch?v=")[1];
                var url = baseUrl + videoID;
                this.summary.video = this._sanitizer.bypassSecurityTrustResourceUrl(baseUrl + videoID);
                this.summaryServe.next(this.summary);
                return true;
            }
        });
    }

    getSucessLaunchLandCount(status: number) {
        var result = {};
        if (status == 1) {
            var launchSuccess = 0;
            var launchFailure = 0;

            this.launches.forEach((data) => {
                if (data.launch_success == true) {
                    launchSuccess += 1;
                } else {
                    launchFailure += 1;
                }
            });
            return ({ 'success': launchSuccess, 'failure': launchFailure })
        } else {
            var landingsSuccess = 0;
            var landingsFailure = 0;

            this.launches.forEach((data) => {
                if (data.launch_land == true) {
                    landingsSuccess += 1;
                } else {
                    landingsFailure += 1;
                }
            });
            return ({ 'success': landingsSuccess, 'failure': landingsFailure })

        }

    }

    getSummaryData() {
        var averageWeight;
        var minWeight;
        var maxWeight;
        var lastLaunch;

        var maxFlight = 0;
        var totalWeight = 0;
        var min = 99999;
        var max = 1;

        var payloads = [];
        var maxFlight = 1;

        for (let data of this.launches) {

            if (Number(data.flight_number) > maxFlight) {
                maxFlight = Number(data.flight_number);
                lastLaunch = data.launch_date;
            }
            if (Number(data.payload_mass_lbs) > max) {
                max = data.payload_mass_lbs;
            }
            if (Number(data.payload_mass_lbs) < min && Number(data.payload_mass_lbs) > 0) {
                min = data.payload_mass_lbs;
            }
            if(Number(data.payload_mass_lbs)){
                totalWeight += Number(data.payload_mass_lbs);
            }
            
        }

        averageWeight = totalWeight / this.launches.length;
        maxWeight = max;
        minWeight = min;
        var returnOverview = new Object({avg:averageWeight,min:minWeight,max:maxWeight,lastLaunch:lastLaunch});
        return returnOverview;

    }

}
