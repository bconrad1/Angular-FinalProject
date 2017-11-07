export class Launch{
 
    flight_number : string;
    launch_year: string;
    launch_date: string;
    rocket_id: string;
    rocket_name: string;
    rocket_type: string;
    launch_site: string;
    payload_type: string;
    payload_customer: string;
    payload_mass_lbs: number;
    launch_success: boolean;
    launch_land: boolean;
    mission_patch:string;
    mission_video:string;
    mission_article: string;
    details: string;


    constructor(flight_number : string, launch_year: string, launch_date: string, rocket_id: string, rocket_name: string, rocket_type: string,launch_site: string, payload_type: string,
    payload_customer: string, payload_mass_lbs: number, launch_success: boolean, launch_land: boolean, mission_patch:string, mission_video:string, mission_article: string, details: string){
            this.flight_number = flight_number;
            this.launch_year = launch_year;
            this.launch_date = launch_date;
            this.rocket_id = rocket_id;
            this.rocket_name = rocket_name;
            this.rocket_type = rocket_type;
            this.launch_site = launch_site;
            this.payload_type = payload_type;
            this.payload_customer = payload_customer;
            this.payload_mass_lbs = payload_mass_lbs;
            this.launch_success = launch_success;
            this.launch_land = launch_land;
            this.mission_patch = mission_patch;
            this.mission_video = mission_video;
            this.mission_article = mission_article;
            this.details = details;


    }


}