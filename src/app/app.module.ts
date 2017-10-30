import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent} from './login/login.component';
import { AuthService} from './services/auth.service';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { ChatboxService } from './services/chatbox.service';
import { TwoButtonComponent } from './two-button/two-button.component';
const routes: Routes =[

 { path: 'login', component: LoginComponent },
 { path: 'home', component: DashboardComponent },
 { path: 'settings', component: SettingsComponent },
 { path: '', redirectTo: 'login', pathMatch: 'full' }, 

]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatboxComponent,
    DashboardComponent,
    SettingsComponent,
    TwoButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, ChatboxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
