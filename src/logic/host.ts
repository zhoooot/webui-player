import { ClientPlayer } from "./client-player";

export class Host {
    static client: ClientPlayer = new ClientPlayer();

    static sendMessage(message: any) {
        this.client.sendMessage(message);
    }

    static getHostClient() {
        if (!Host.client) {
            Host.client = new ClientPlayer();
        }
        return Host.client;
    }

    static onMessage(callback: (event: any, data: any) => void) {
        this.client.onReceiveMessage(callback);
    }
}