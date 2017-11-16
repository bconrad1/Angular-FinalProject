import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import {Person} from '../person.model';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class AuthService {

  authState: any = null;
  userRef: AngularFireObject<any>; 
  loggedIn: boolean= false;
  displayName : string;
  imageUrl : string;
  signedInUser : Person[] = [];
  email: string;
  uuid: string;

  displayNameServe : Subject<string> = new Subject<string>();
  imageUrlServe : Subject<string> = new Subject<string>();

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private afs: AngularFirestore) {
    
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });

    this.displayNameServe.subscribe((value)=> {
        this.displayName = value;
    });

    this.imageUrlServe.subscribe((value) =>{
      this.imageUrl = value;
    })

    
    
    
    
    
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    
    return this.authState !== null;

  }
  // Returns current user data
  get currentUser(): any {
    return this.signedInUser;
  }

  get getAvatar(){
    return this.imageUrl;
  }

  updateInfo(name: string, email: string, avatar: string){
      var docRef = this.afs.collection("users").doc(this.authState.email);
      docRef.set({'username':name, 'email':email, 'imageUrl' : avatar});   
      console.log()
      this.setUserSettings(name,avatar,email);
  }


emailSignUp(email: string, password: string, name: string, avatar:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
         this.authState = user
         this.updateInfo(name,email,avatar);
         this.setUserSettings(name,avatar,this.authState.email);
         
         
      })
      .catch(error => console.log(error));
  }

 emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        var docRef = this.afs.collection("users").doc(this.authState.email);
       
        var imageUrl ="";
        var displayName;
        var profile;


        docRef.ref.get().then((doc)=>{
              if(doc.exists){
         
              displayName = doc.data().username;
              imageUrl = doc.data().imageUrl;
              profile = new Person(doc.data().username,doc.data().email,doc.data().imageUrl);
              
              }else{
              
                this.afs.collection('users').doc(this.authState.email).set({'username':this.displayName, 'email':this.authState.email, 'imageUrl' : this.imageUrl, 'id': this.authState.uuid})
              }
    
              this.imageUrlServe.next(imageUrl);
              this.displayNameServe.next(displayName);
              this.email = user.email;
              this.router.navigateByUrl('dashboard');
              this.setUserSettings(displayName,imageUrl,this.authState.email);
              this.getUserSettings();
        })


      })
      .catch();
  }

  signOut(): void {
    console.log('signOut')
    this.afAuth.auth.signOut();
    this.clearUserSettings();
    
  }

  clearUserSettings(){
     //Default profile values
     this.displayName = ''
     this.imageUrl = ""
  }

  setUserSettings(name: string, avatar:string, email:string){
  
    this.displayName = name;
    this.imageUrl = avatar;
    var userStorage = {'name':name, 'avatar':avatar, 'email' : email}
    localStorage.setItem(this.authState.email,JSON.stringify(userStorage));

  }
  
  getDisplayName(){


    return this.displayName;
  }

  getUserSettings(){
    console.log(this.authState.email)
    var retrievedObject = localStorage.getItem(this.authState.email);
    return JSON.parse(retrievedObject)

  }


}