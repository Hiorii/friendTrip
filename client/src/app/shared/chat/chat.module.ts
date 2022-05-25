import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import { SingleMessageComponent } from './single-message/single-message.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    ChatComponent,
    SingleMessageComponent
  ],
  exports: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
  ]
})
export class ChatModule { }
