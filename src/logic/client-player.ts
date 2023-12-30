import { OnModuleInit } from '@nestjs/common';
import {Socket, io} from 'socket.io-client';

export class ClientPlayer {
    public socketClient: Socket;

    constructor() {
        this.socketClient = io('http://192.168.1.12:8080', { transports : ['websocket'] });
        console.log("Entering...")
        this.socketClient.on('connect', () => {
            console.log('connected');
        });
        this.socketClient.on('disconnect', () => {
            console.log('disconnected');
        });
    }

    public sendMessage(message: any) {
        this.socketClient.emit('message', message);
    }

    public onReceiveMessage(callback: (event: any, data: any) => void) {
        this.socketClient.on('message', callback);
    }
}