export class Player{
    constructor(name, wallet){
        this.name = name;
        this.wallet = wallet;
        this.cards = [];
    }

    #points = 0;

    set points(score){
        this.#points += score;
    }

    get points(){
        return this.#points;
    }

    addCard(card){
        this.cards.push(card);
    }

    increaseCash(cash){
        this.wallet += cash;
    }

    decreaseCash(cash){
        this.wallet -= cash;
    }
}