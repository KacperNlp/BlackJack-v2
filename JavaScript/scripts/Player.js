export class Player{
    constructor(name, wallet, moves) {
        this.name = name;
        this.wallet = wallet;
        this.cards = [];
        this.moves = moves;
    }

    #points = 0;

    //points handle
    get points() {
        return this.#points;
    }

    addCard(card) {
        this.cards.push(card);
    }

    cleanStats() {
        this.cards = [];
        this.#points = 0;
    }


    //wallet handle
    increaseCash(cash) {
        this.wallet += cash;
    }

    decreaseCash(cash) {
        this.wallet -= cash;
        return cash;
    }

    calculatePoints() {
        if(this.#cardsWithTheSameWeight('A') === 2 && this.cards.length === 2) {
            this.#points = 21;
            return;
        }

        const score = this.cards.map( ({weight}, id, cards) => {
            if(['K', 'Q', 'J'].includes(weight)){
                return 10;
            }else if(weight === 'A' && cards.length === 2){
                return 11;
            }else if(weight === 'A' && cards.length > 2){
                return 1;
            }else{
                return parseInt(weight);
            }
        })

        const sum = score.reduce((sum, currentCardWeight) => sum + currentCardWeight);

        this.#points = sum;
    }

    #cardsWithTheSameWeight(weight) {
        return this.cards.filter(card => card.weight === weight).length;
    }
}