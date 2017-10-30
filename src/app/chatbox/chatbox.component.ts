import { Component, OnInit } from '@angular/core';
import { Chatbox } from './chatbox.module';
import { ChatboxService} from '../services/chatbox.service';
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  chatHistory : Chatbox[]= [];
  message : string;

  constructor(private chatboxService: ChatboxService) { }

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

}
