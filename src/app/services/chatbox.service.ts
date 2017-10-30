import { Injectable } from '@angular/core';
import { Chatbox } from '../Chatbox/chatbox.module';
@Injectable()
export class ChatboxService {
    
    chatHistory : Chatbox[] = [];
    
    constructor(){

        this.chatHistory.unshift(new Chatbox("Ben","This is only a test for now",this.getDate(),1))
        this.chatHistory.unshift(new Chatbox("Ben","Eventually there will be more, but this is only a placeholder.",this.getDate(),1))
        this.chatHistory.unshift(new Chatbox("Ben","Here is a random fact so I can use space: The numbers '172' can be found on the back of the U.S. $5 dollar bill in the bushes at the base of the Lincoln Memorial.",this.getDate(),1))
         this.chatHistory.unshift(new Chatbox("John","Last one to demonstate a different user.",this.getDate(),2))
    }

    getChatHistory(){

        
        // for (var _i = this.chatHistory.length; _i >=0; _i--) {
        //     var item = this.chatHistory[_i];
        //     console.log(item)
        //     returnChat.push(item);
        // }
        
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
