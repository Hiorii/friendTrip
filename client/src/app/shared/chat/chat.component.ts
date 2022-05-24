import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Observable} from "rxjs";
import {ChatService} from "./chat.service";
import {MessageModel} from "../../core/interfaces/message.model";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatForm = this.fb.group({
    message: [''],
  })

  newMessage$: Observable<string>;
  messages: MessageModel[] = [];

  @Output() isChatVisible = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    return this.chatService.getNewMessage().subscribe((message: string) => {
      this.messages.push({from: 'other', message});
    })
  }

  onSubmit(e: any) {
    e.preventDefault();

    if (!this.chatForm.value.message) return;

    this.chatService.sendMessage(this.chatForm.value.message);

    this.chatForm.reset();
  }

  closeChatRoom() {
    this.isChatVisible.emit(false);
  }
}
