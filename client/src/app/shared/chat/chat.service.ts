import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";
import {MessageModel} from "../../core/interfaces/message.model";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private socket: Socket
  ) { }

  sendMessage(message: MessageModel): void {
    this.socket.emit('sendMessage', message);
  }

  getNewMessage(): Observable<MessageModel> {
    return this.socket.fromEvent<MessageModel>('newMessage')
  }
}
