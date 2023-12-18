import { OnModuleInit } from '@nestjs/common';
import {Socket, io} from 'socket.io-client';

export class ClientPlayer implements OnModuleInit {
    public socketClient: Socket;

    constructor() {
        this.socketClient = io('http://localhost:8080', { transports : ['websocket'] });
    }
    onModuleInit() {
        this.socketClient.emit('join', 'player');
        this.socketClient.on('connect', () => {
            console.log('connected');
        });
        this.socketClient.on('disconnect', () => {
            console.log('disconnected');
        });
    }

    public sendMessage(message: string) {
        this.socketClient.emit('message', message);
    }
}