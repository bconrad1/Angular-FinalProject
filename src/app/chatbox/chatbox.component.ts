import { Component, OnInit } from '@angular/core';
import { Chatbox } from './chatbox.module';
import { ChatboxService} from '../services/chatbox.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  chatHistory : Chatbox[]= [];
  message : string;
  clicked : boolean = false;

  constructor(private chatboxService: ChatboxService, public authService: AuthService) { }

  ngOnInit() {

    this.chatHistory = this.chatboxService.getChatHistory();
    
 
  }

  sendMessage(){

    this.chatboxService.sendChat(this.message)
    this.clearInput();
  }
  
  clearInput(){
    this.message ='';
  }


  loggedIn():boolean{
    
    return this.authService.authenticated;
    
  }




}
