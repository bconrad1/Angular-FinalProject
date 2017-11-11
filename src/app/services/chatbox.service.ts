import { Injectable } from '@angular/core';
import { Chatbox } from '../Chatbox/chatbox.module';
@Injectable()
export class ChatboxService {
    
    chatHistory : Chatbox[] = [];
    
    constructor(){

        this.chatHistory.unshift(new Chatbox("HelpBot","Here are some common things you can send!",this.getDate(),1))
        this.chatHistory.unshift(new Chatbox("HelpBot", "1. Watch a video of the launch. Type: Flight # - video", this.getDate(),1))
        this.chatHistory.unshift(new Chatbox("HelpBot", "2. Read an article. Type: Flight # - article", this.getDate(),1))

    }

    getChatHistory(){       
        return this.chatHistory;
    }



    getDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        var day ='';
        var month = '';
        if(dd<10){
            day ='0'+dd;
        } 
        if(mm<10){
            month='0'+month
        } 
        var currentDay = dd+'/'+mm+'/'+yyyy;
        return currentDay;
    }

    sendChat(msg: string){
        this.chatHistory.unshift(new Chatbox('Ben',msg,this.getDate(),1));
        this.returnChat();
  
    }
    returnChat(){
        this.chatHistory.unshift(new Chatbox('John',"This is an automated reply.",this.getDate(),2))
    }
    

}
