export class Game {
    public _id: string;
    public name: string;
    public state: string;
    public creatorId: string;
    public gameStart: string;
    public gameEnd: string;
    public winner1: string;
    public winner2: string;
    public players: [{}];

    public constructor(id: string, name: string,state: string, creatorId: string, gameStart: string, gameEnd: string, winner1: string, winner2: string, players: [{}]){
        this._id = id;
        this.name = name;
        this.state = state;
        this.creatorId = creatorId;
        this.gameStart = gameStart;
        this.gameEnd = gameEnd;
        this.winner1 = winner1; // verificar
        this.winner2 = winner2; // verificar
        this.players = players;
    }
}
