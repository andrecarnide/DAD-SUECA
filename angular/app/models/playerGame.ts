import { Card } from "./card";

export class PlayerGame {
    public userId : String = '';
    public gameId : String = '';
    public playerCards : Card[] = [];
    public playerTurn : number = 0;
    public playerTeam : String = '';

    public constructor(userId: string, gameId: string, playerCards: Card[], playerTurn: number, playerTeam: string){
        this.userId = userId;
        this.gameId = gameId;
        this.playerCards = playerCards;
        this.playerTurn = playerTurn;
        this.playerTeam = playerTeam;
    }
};


