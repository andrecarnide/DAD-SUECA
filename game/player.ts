import {PlayerGame} from "./playerGame";

export class Player {
    public username: String;
    public games: PlayerGame[] = [];

    public constructor() {
        this.username = "";
        this.games = [];
    }
};
