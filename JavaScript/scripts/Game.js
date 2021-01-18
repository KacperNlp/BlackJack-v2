import {BindToHtml} from './BindToHtml.js';
import {Player} from './Player.js';
import {settings} from './Settings.js';
import {Deck} from './Deck.js';
import { GameState } from './GameState.js';

const GAME_LAYER_ID = 'game';

//first player selectors and Id's
const FIRST_PLAYER_PLACES_FOR_NAME_CLASS = '.first-player-name';
const FIRTS_PLAYER_WALLET_ID = 'first-player-wallet';
const FIRTS_PLAYER_POINTS_CONTAINER_ID = 'first-player-points';
const FIRST_PLAYER_CARDS_CONTAINER_ID = 'first-player-cards';

//second player selectors and Id's
const SECOND_PLAYER_PLACES_FOR_NAME_CLASS = '.second-player-name';
const SECOND_PLAYER_WALLET_ID = 'second-player-wallet';
const SECOND_PLAYER_POINTS_CONTAINER_ID = 'second-player-points';
const SECOND_PLAYER_CARDS_CONTAINER_ID = 'second-player-cards';

//buttons 
const TAKE_CARD_BUTTON_ID = 'take-card';
const STAY_BUTTON_ID = 'stay';

const GAME_COSTS = {
    costOfCard: 50,
    costOfDeal: 100,
}

//Game state html container (number of rounds and money pool)
const NUMBER_OF_ROUNDS_CONTAINER_ID = 'number-of-round';
const MONEY_POOL_CONTAINER_ID = 'money-pool';


class Game extends BindToHtml{
    constructor(){
        super(GAME_LAYER_ID);

        this.firstPlayer = null;
        this.secondPlayer = null;

        this.deck = null;
        this.stay = false;
        this.gameState = null;
    }

    initGame(){

        this.gameState = new GameState();
        this.#createDeck();//init new deck

        this.firstPlayer = new Player(settings.firstPlayerName, settings.walletCash, true);
        this.secondPlayer = new Player(settings.secondPlayerName, settings.walletCash, false);

        //bind and init players names with html
        this.#initPlayerNameInHtml(this.firstPlayer, this.bindElementsBySelector(FIRST_PLAYER_PLACES_FOR_NAME_CLASS));
        this.#initPlayerNameInHtml(this.secondPlayer, this.bindElementsBySelector(SECOND_PLAYER_PLACES_FOR_NAME_CLASS));

        this.#dealCards();

        this.#buttonsHandle();

    }

    #nextRoundInit = () =>{

        //unlock first player moves
        this.firstPlayer.moves = true;

        //clean stats like point and cards in hand
        this.firstPlayer.cleanStats();
        this.secondPlayer.cleanStats();

        //clean html
        const firstPlayerCardsContainer = this.bindById(FIRST_PLAYER_CARDS_CONTAINER_ID);
        const secondPlayerCardsContainer = this.bindById(SECOND_PLAYER_CARDS_CONTAINER_ID);

        console.log(firstPlayerCardsContainer)

        //clear cards containers
        while(firstPlayerCardsContainer.firstChild){
            firstPlayerCardsContainer.removeChild(firstPlayerCardsContainer.lastChild)
        }

        while(secondPlayerCardsContainer.firstChild){
            secondPlayerCardsContainer.removeChild(secondPlayerCardsContainer.lastChild)
        }

        this.#createDeck();
        this.#dealCards();

    }

    #createDeck(){
        this.deck = new Deck();
        this.deck.shuffle();
    }

    #initPlayerNameInHtml(player, placesForName){

        for(let place = 0; place < placesForName.length; place++){
            placesForName[place].textContent = player.name
        }
        
    }

    //deal two cards to all players
    #dealCards(){

        for(let numberOfDeal = 0; numberOfDeal < 2; numberOfDeal++){
            
            //first player
            const firstPlayerCard = this.deck.pickOne();
            this.firstPlayer.addCard(firstPlayerCard);
            this.#appendCard(FIRST_PLAYER_CARDS_CONTAINER_ID, firstPlayerCard.render());

            //second player
            const secondPlayerCard = this.deck.pickOne();
            this.secondPlayer.addCard(secondPlayerCard);
            this.#appendCard(SECOND_PLAYER_CARDS_CONTAINER_ID, secondPlayerCard.render());

        }

        //cash for first cash deal
        let moneyPool =  this.firstPlayer.decreaseCash(GAME_COSTS.costOfDeal);
        moneyPool += this.secondPlayer.decreaseCash(GAME_COSTS.costOfDeal);

        this.gameState.increaseMoneyPool(moneyPool)

        this.#calculatePlayersPoints();
        this.#setPlayersStats();
        this.#setGameState();

    }

    #buttonsHandle(){

        const takeCardButton = this.bindById(TAKE_CARD_BUTTON_ID);
        const stayButton = this.bindById(STAY_BUTTON_ID);

        takeCardButton.addEventListener('click', this.#handleTakeCardButton)
        stayButton.addEventListener('click', this.#handleStayButton)

    }

    //append card to player cards container
    #appendCard(id, card){

        const cardsContainer  = this.bindById(id);

        cardsContainer.appendChild(card);

    }

    #calculatePlayersPoints(){
        this.firstPlayer.calculatePoints();
        this.secondPlayer.calculatePoints();
    }

    #setPlayersStats(){

        //first player
        const firstPlayerPointsContainer  = this.bindById(FIRTS_PLAYER_POINTS_CONTAINER_ID);
        const firstPlayerWallet = this.bindById(FIRTS_PLAYER_WALLET_ID);

        firstPlayerPointsContainer.textContent = this.firstPlayer.points;
        firstPlayerWallet.textContent = this.firstPlayer.wallet;

        //second player
        const secondPlayerPointsContainer  = this.bindById(SECOND_PLAYER_POINTS_CONTAINER_ID);
        const secondPlayerWallet = this.bindById(SECOND_PLAYER_WALLET_ID);

        secondPlayerPointsContainer.textContent = this.secondPlayer.points;
        secondPlayerWallet.textContent = this.secondPlayer.wallet;
    }

    #setGameState(){
        const numberOfRounds = this.bindById(NUMBER_OF_ROUNDS_CONTAINER_ID);
        const moneyPool = this.bindById(MONEY_POOL_CONTAINER_ID);

        numberOfRounds.textContent = this.gameState.numberOfRound;
        moneyPool.textContent = this.gameState.moneyPool;
    }


    //buttons handle
    #handleTakeCardButton = () => {

        let player;
        let id;

        if(this.firstPlayer.moves){
            player = this.firstPlayer;
            id = FIRST_PLAYER_CARDS_CONTAINER_ID;
        } 
        else if(this.secondPlayer.moves && !settings.withAI){
            player = this.secondPlayer;
            id = SECOND_PLAYER_CARDS_CONTAINER_ID;
        } 

        //cash for card
        const cash = player.decreaseCash(GAME_COSTS.costOfCard);
        this.gameState.increaseMoneyPool(cash)

        const card = this.deck.pickOne();
        player.addCard(card)
        this.#appendCard(id, card.render());

        this.#calculatePlayersPoints();
        this.#setPlayersStats();
        this.#setGameState();

    }

    #handleStayButton = () => {

        if(this.firstPlayer.moves){
            this.firstPlayer.moves = false;

            if(!settings.withAI){
                this.secondPlayer.moves = true;
            }else{
                this.#handleAI(this.firstPlayer, this.secondPlayer)
            }
        } 
        else if(this.secondPlayer.moves && !settings.withAI){
            this.secondPlayer.moves = false;
            this.#checksEndOfRound();
        } 

    }

    #handleAI(player, AI){
        if(player.points < AI.points && player.points < 21 || player.points === 21 || player.points > 21){
            this.#setPlayersStats();
            this.#setGameState();
            this.#checksEndOfRound();
            return;
        }

        while(player.points >= AI.points){

            const cash = AI.decreaseCash(50);
            this.gameState.increaseMoneyPool(cash);

            const card = this.deck.pickOne();

            AI.addCard(card);
            this.#appendCard(SECOND_PLAYER_CARDS_CONTAINER_ID, card.render())

            this.#calculatePlayersPoints();     
        }

        this.#setPlayersStats();
        this.#setGameState();
        this.#checksEndOfRound();
    }

    #checksEndOfRound(){

        const wonMoney = this.gameState.clearMoneyPool()

        //first player won
        if(this.firstPlayer.points === 21 
            && this.secondPlayer.points !== 21 
            || this.firstPlayer.points < 21 
            && this.firstPlayer.points > this.secondPlayer.points 
            || this.secondPlayer.points > 21){

            this.firstPlayer.increaseCash(wonMoney);

            //AI or second player won
        }else if(this.secondPlayer.points === 21 
            && this.firstPlayer.points !== 21 
            || this.secondPlayer.points < 21 
            && this.secondPlayer.points > this.firstPlayer.points 
            || this.firstPlayer.points > 21){

            this.secondPlayer.increaseCash(wonMoney);

            //drawn
        }else{

            this.secondPlayer.increaseCash(100);
            this.firstPlayer.increaseCash(100);

        }

        setTimeout(this.#nextRoundInit, 2000)

    }

}

export const game = new Game();