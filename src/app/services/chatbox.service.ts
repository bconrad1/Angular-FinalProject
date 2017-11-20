import { Injectable } from '@angular/core';
import { Chatbox } from '../Chatbox/chatbox.module';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ChatboxService {

    chatHistory: Chatbox[] = [];

    constructor(private dataService: DataService, private auth: AuthService) {

        var initialBlock = "Here are some common things you can send!\n 1. Launches per Customer (TYPE): \n     LAUNCH---customerName \n 2. Change Flight Summary (TYPE):\n     SUMMARY---flightNumber\n 3. Succesful and failed launches TYPE:\n     LAUNCHES---STATUS\
        \n4. Succesful and failed landings TYPE:\n     LANDINGS---STATUS "


        this.chatHistory.push(new Chatbox("HelpBot", initialBlock
            , this.getDate(), 1))

    }

    getChatHistory() {
        return this.chatHistory;
    }



    getDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        var day = '';
        var month = '';
        if (dd < 10) {
            day = '0' + dd;
        }
        if (mm < 10) {
            month = '0' + month
        }
        var currentDay = dd + '/' + mm + '/' + yyyy;
        return currentDay;
    }

    sendChat(msg: string) {
        var user = this.auth.getUserSettings();
        console.log(user)
        this.chatHistory.push(new Chatbox(user.name, msg, this.getDate(), 1));
    }

    returnChat(chat: string) {

        this.chatHistory.push(new Chatbox('Chatbot', chat, this.getDate(), 2))
    }

    getLaunches(customer: string) {
        try {
            var count = this.dataService.getLaunchesPer(customer);
            this.returnChat('The total launches for ' + customer + ' is ' + count);
        } catch (err) {
            this.returnChat("There was an error with your request");
        }
    }

    changeSummary(flightNum: string) {
        try {
            this.dataService.changeSummary(flightNum);
            this.returnChat("We have changed the summary");
        } catch (err) {
            this.returnChat("There was an error with your request");
        }
    }

    getStatus(status: number) {

        try {
            var results = this.dataService.getSucessLaunchLandCount(status);

            if (status == 1) {
                this.returnChat("There have been " + results.success + " successful launches and " + results.failure + " failures.")
            } else {
                this.returnChat("There have been " + results.success + " successful landings and " + results.failure + " failures.")
            }
        } catch (err) {
            this.returnChat("There was an error with your request");
        }
    }
}
