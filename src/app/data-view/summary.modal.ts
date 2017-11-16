export class Summary{

    launchDate: string;
    year: string;
    customer: string[];
    payload: string;
    missionPatch : string;
    video : any;
    flightNum : string;
    article : string;
    
    constructor(launchDate,year,customer,payload,missionPatch, video, flightNum, article){
        this.launchDate = launchDate;
        this.year = year;
        this.customer = customer;
        this.payload = payload;
        this.missionPatch = missionPatch;
        this.video = video;
        this.flightNum = flightNum; 
        this.article = article;
        
    }


}