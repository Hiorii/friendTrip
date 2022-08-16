import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: ['http://localhost:4200', 'http://192.168.43.224.nip.io:4200/'] },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args): any {
    console.log('connection made');
  }

  handleDisconnect(client: any): any {
    console.log('disconnected');
  }

  @SubscribeMessage('sendMessage')
  handleMessage(socket: Socket, message: { from: string, message: string }) {
    this.server.emit('newMessage', message);
  }
}
