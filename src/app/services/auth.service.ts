import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {

  authState: any = null;
  userRef: AngularFireObject<any>; 
  loggedIn: boolean= false;
  displayName : string;
  imageUrl : string;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private afs: AngularFirestore) {
    
    
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
      console.log(this.authState);
    });
  }

  // Returns true if user is logged in
 get authenticated(): boolean {
    return this.authState !== null;
  }
  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }



emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        //this.updateUserData()
      })
      .catch(error => console.log(error));
  }

 emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        //this.updateUserData()
      })
      .catch(error => console.log(error));
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }


 
  private updateUserData(): void {
        this.afs.collection('users').add({'username':this.displayName, 'email':this.authState.email, 'imageUrl' : this.imageUrl})

  }




}