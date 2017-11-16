import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule,} from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent} from './login/login.component';
import { AuthService} from './services/auth.service';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { ChatboxService } from './services/chatbox.service';
import { TwoButtonComponent } from './two-button/two-button.component';
import { DataViewComponent } from './data-view/data-view.component';
import { DataService } from './services/data.service'
import { PapaParseService } from 'ngx-papaparse';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { LoggedInGuard } from './services/logged-in.guard';
import { RedirectGuard } from './services/redirect.guard';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';


const routes: Routes =[

 { path: 'login', component: LoginComponent},
 { path: 'home', component: DataViewComponent,  canActivate: [ LoggedInGuard]},
 { path: 'dashboard', component: DashboardComponent, canActivate: [ LoggedInGuard]},
 { path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [ RedirectGuard]}, 
 { path: 'settings', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [ LoggedInGuard]}, 

]
export const firebaseConfig = {
  apiKey: "AIzaSyCN8YG4NesEaBBZeECqGrPtOPSZDvdD-YE",
  authDomain: "studentsurveyfinal.firebaseapp.com",
  databaseURL: "https://studentsurveyfinal.firebaseio.com",
  storageBucket: "studentsurveyfinal.appspot.com",
  messagingSenderId: "885302863045",
  projectId: "studentsurveyfinal",
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatboxComponent,
    DashboardComponent,
    SettingsComponent,
    TwoButtonComponent,
    DataViewComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    RouterModule.forRoot(routes),    
  ],
  providers: [AuthService, ChatboxService, DataService, PapaParseService, AngularFireDatabase,LoggedInGuard,],
  bootstrap: [AppComponent]
})
export class AppModule { }
