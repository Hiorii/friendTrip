import {Component, Input, OnInit} from '@angular/core';
import {MessageModel} from "../../../core/interfaces/message.model";

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: ['./single-message.component.scss']
})
export class SingleMessageComponent implements OnInit {
  @Input() messages: MessageModel[];
  @Input() currentUser: any;

  currentTime = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
