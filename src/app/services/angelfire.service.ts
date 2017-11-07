import {Injectable} from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DataService } from '../services/data.service';
import {Launch} from '../launch.model';
import {Http} from '@angular/http';
interface Post{
    age: string;
    location: string;
    name: string;
}

@Injectable()
export class AngelFire {
    results : Launch[];
    postsCol: AngularFirestoreCollection<Post>;
    posts: Observable<Post[]>;
    url : string = "https://api.spacexdata.com/v1/launches/"
    
    constructor(private afs: AngularFirestore, private dataService: DataService, private http: Http ) {}
     
     ngOnInit() {
        // this.postsCol = this.afs.collection('test');
        // this.posts = this.postsCol.valueChanges();
        this.populateStore();
     }


    addPost() {
        this.afs.collection('test').add({'age': '500', 'location': "chicago", 'name':'Joe'});
    }

    getPosts(){
        this.posts = this.afs.collection('test').valueChanges();
        return this.posts;
    }

    populateStore(){
        var results;
        this.getJSON().subscribe(data => results=data, error => console.log(error));
        
        console.log('go')
        results.map(function(item){
           console.log(item['launch_year']);
        })

    }

    public getJSON(): Observable<any> {
         return this.http.get("./file.json")
                         .map((res:any) => res.json());
    }

}