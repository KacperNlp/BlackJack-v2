
export class GameState{
    constructor(){
        this.moneyPool = 0;
        this.numberOfRound = 0;
    }

    increaseMoneyPool(cash){
        this.moneyPool += cash;
    }

    clearMoneyPool(){

        const cash = this.moneyPool;
        this.moneyPool = 0;
        return cash;

    }

    increaseNumberOfRound(){
        this.numberOfRound++;
    }
}