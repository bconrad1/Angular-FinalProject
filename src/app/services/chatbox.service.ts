import { Injectable } from '@angular/core';
import { Chatbox } from '../Chatbox/chatbox.module';
import { DataService } from '../services/data.service';

@Injectable()
export class ChatboxService {
    
    chatHistory : Chatbox[] = [];
    
    constructor(private dataService : DataService){

        var initialBlock = "Here are some common things you can send!\n 1. Launches per Customer (TYPE): \n     LAUNCH---customerName \n 2. Change Flight Summary (TYPE):\n     SUMMARY---flightNumber"
    

        this.chatHistory.push(new Chatbox("HelpBot",initialBlock
        ,this.getDate(),1))
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
        this.chatHistory.push(new Chatbox('Ben',msg,this.getDate(),1));  
    }

    returnChat(chat:string){
        
        this.chatHistory.push(new Chatbox('Chatbot',chat,this.getDate(),2))
    }
    
    getLaunches(customer:string){

        var count = this.dataService.getLaunchesPer(customer);
        this.returnChat('The total launches for ' + customer + ' is ' + count);
    }
    
    changeSummary(flightNum:string){

        this.dataService.changeSummary(flightNum);
    }


}
