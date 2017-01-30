import { cardSuit } from "./cardSuit";
import { cardValue } from "./cardValue";

export class Card {

    constructor(private suite: cardSuit, private value: cardValue){ }

    public getSuit(): string {
        return cardSuit[this.suite];
    }

    public getValue(): string {
        return cardValue[this.value];
    }

    public getImageName(): string
    {
        return "../../../assets/img/cards/" + this.getSuit() + "-" + this.getValue() + ".png";
    }
}
