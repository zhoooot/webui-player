import { ClientPlayer } from "./client-player";

export class Player {
    static client: ClientPlayer = new ClientPlayer();

    static sendMessage(message: any) {
        this.client.sendMessage(message);
    }

    static getPlayerClient() {
        if (!Player.client) {
            Player.client = new ClientPlayer();
        }
        return Player.client;
    }

    static onMessage(callback: (event: any, data: any) => void) {
        this.client.onReceiveMessage(callback);
    }
}