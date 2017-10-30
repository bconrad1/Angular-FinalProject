import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-two-button',
  templateUrl: './two-button.component.html',
  styleUrls: ['./two-button.component.css']
})
export class TwoButtonComponent{
  @Input() btn1: string;
  @Input() btn2: string;


 constructor() { }


}
