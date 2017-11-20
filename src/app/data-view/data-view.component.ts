import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs/Observable';
import { Launch } from '../launch.model';
import { AuthService } from '../services/auth.service';
import { Summary } from './summary.modal';
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
    missionArticle: string;
    details: string;






    launches: Observable<any[]>;
    launchesArray: Launch[] = [];
    launchesOriginal: Launch[] = [];
    launchesDone: Observable<any[]>;

    filterCustomer: string;
    filterYear: string;
    filterRocket: string;
    filterFlight: string;

    summary: Summary = this.dataService.returnSummary();
    hide: boolean;
    summaryView = false;
    dataView = true;
    addError: boolean = false;

    videoUrl: any;
    addLaunch: boolean = false;
    overview: object;

    flightFilterOn: boolean = false;

    constructor(private dataService: DataService, authService: AuthService, private _sanitizer: DomSanitizer) {

        console.log("constructing dataview")
        this.launchesOriginal = dataService.getData();
        this.launchesArray = this.launchesOriginal;
        this.overview = this.dataService.getSummaryData()


    }


    databaseLaunch() {

        var customerArray = [];


        console.log(this.flightNumber);
        if (this.flightNumber === undefined || this.flightNumber === undefined || this.launchYear === undefined || this.launchDate === undefined || this.rocketId === undefined ||
            this.rocketName === undefined || this.rocketType === undefined || this.launchSite === undefined || this.payloadType === undefined || customerArray === undefined ||
            this.payloadMass === undefined || this.launchSuccess === undefined || this.launchLand === undefined || this.missionPatch === undefined || this.missionVideo === undefined ||
            this.missionPatch === undefined) {
            this.addError = true;
        } else {

            if (this.payloadCustomer != undefined) {
                if (this.payloadCustomer.includes(',')) {
                    var customers = this.payloadCustomer.split(',');
                    customerArray = customers;
                } else {
                    customerArray.push(this.payloadCustomer);
                }
            }



            var launch = new Launch(this.flightNumber, this.launchYear, this.launchDate, this.rocketId, this.rocketName, this.rocketType,
                this.launchSite, this.payloadType, customerArray, this.payloadMass, this.launchSuccess, this.launchLand,
                this.missionPatch, this.missionVideo, this.missionPatch, this.details, false);

            this.dataService.addLaunch(launch);
            this.addError = false;
        }



    }



    showLaunch() {
        this.addLaunch = !this.addLaunch;
    }

    get addLaunchError() {
        return this.addError;
    }
    get getAddLaunch() {
        return this.addLaunch;
    }
    get getLaunches() {
        return this.launches;
    }



    filter() {


        var yearLength = this.filterYear;
        var customerLength = this.filterCustomer;
        var rocketLength = this.filterRocket;
        var flightLength = this.filterFlight;

        this.launchesArray = [];
        this.launchesOriginal.forEach(data => {

            var cust = data.payload_customer[0];
            var rock = data.rocket_name;
            var year = data.launch_year;
            var flight = data.flight_number;
            if (flightLength != null) {

                if (Number(flight) == Number(this.filterFlight)) {
                    this.launchesArray.push(data)
                }
            } else if (yearLength != null && customerLength != null && rocketLength != null) {

                if (cust === this.filterCustomer && rock === this.filterRocket && this.filterYear === year) {
                    this.launchesArray.push(data)
                }
            }
            else if (yearLength != null && customerLength != null) {
                if (cust === this.filterCustomer && this.filterYear === year) {
                    this.launchesArray.push(data)
                }
            }
            else if (yearLength != null) {

                if (this.filterYear === year) {
                    this.launchesArray.push(data)
                }
            }
            else if (customerLength != null && rocketLength != null) {
                if (cust === this.filterCustomer && rock === this.filterRocket) {
                    this.launchesArray.push(data)
                }
            }
            else if (customerLength != null) {
                if (cust === this.filterCustomer) {
                    this.launchesArray.push(data)
                }
            }
            else if (rocketLength != null && yearLength != null) {
                if (rock === this.filterRocket && this.filterYear === year) {
                    this.launchesArray.push(data)
                }
            }
            else if (rocketLength != null) {
                if (rock === this.filterRocket) {
                    this.launchesArray.push(data)
                }
            }
            else {
                this.launchesArray.push(data)
            }


        });
        console.log(this.launchesArray);


    }

    clearFilter() {
        this.launchesArray = this.launchesOriginal;
        this.filterCustomer = null;
        this.filterRocket = null;
        this.filterYear = null;
        this.filterFlight = null;
        this.flightFilterOn = false;
    }

    hideData() {
        this.dataView = false;
        this.summaryView = true;

    }

    hideSummary() {
        this.dataView = true;
        this.summaryView = false;
    }

    get getSummary() {
        this.summary = this.dataService.returnSummary();
        return this.summary;



    }

    ngOnInit() {
        this.launches = this.launchesDone;

    }

    //Checks if flight number is being entered. If so disable all other filter.
    ngDoCheck() {
        if (this.filterFlight != undefined) {
            if (this.filterFlight.length > 0) {
                this.flightFilterOn = true;
                this.filterCustomer, this.filterRocket, this.filterYear = "";
            } else {
                this.flightFilterOn = false;
            }
        }
    }

}
