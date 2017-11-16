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
  chatHidden : boolean = true;

  constructor(private chatboxService: ChatboxService, public authService: AuthService) { }

  ngOnInit() {

    this.chatHistory = this.chatboxService.getChatHistory();
    
 
  }

  sendMessage(){
    this.parseChat(this.message);
    
    this.clearInput();
  }
  
  clearInput(){
    this.message ='';
  }


  loggedIn():boolean{
    
    return this.authService.authenticated;
    
  }

  showChat(){
    console.log(this.chatHidden)
    this.chatHidden = !this.chatHidden;
  }

  parseChat(chat : string){
      this.chatboxService.sendChat(chat);
      if(chat.match(/LAUNCH---\w+[A-z+]/g)){
          var customer = chat.split('---')[1];
          this.chatboxService.getLaunches(customer)
      }else if(chat.match(/SUMMARY---\d+/g)){
          var flightNum = chat.split('---')[1];
          if(flightNum.match(/^\d+$/)){
              this.chatboxService.changeSummary(flightNum)
          }else{
              this.chatboxService.returnChat("Sorry, that is not a valid flight number");
          }
          
      }else{
          this.chatboxService.returnChat("Sorry, we don't have an answer to your question.")
      }
  }


}
