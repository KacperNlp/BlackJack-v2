import {BindToHtml} from './BindToHtml.js';
import {Player} from './Player.js';
import {settings} from './Settings.js';
import {Deck} from './Deck.js';

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


class Game extends BindToHtml{
    constructor(){
        super(GAME_LAYER_ID);

        this.firstPlayer = null;
        this.secondPlayer = null;

        this.deck = null;
    }

    initGame(){

        this.deck = new Deck();
        this.deck.shuffle();

        this.firstPlayer = new Player(settings.firstPlayerName, settings.walletCash);
        this.secondPlayer = new Player(settings.secondPlayerName, settings.walletCash);

        //bind and init players names with html
        this.#initPlayerNameInHtml(this.firstPlayer, this.bindElementsBySelector(FIRST_PLAYER_PLACES_FOR_NAME_CLASS));
        this.#initPlayerNameInHtml(this.secondPlayer, this.bindElementsBySelector(SECOND_PLAYER_PLACES_FOR_NAME_CLASS));

        this.#initPlayersStats();
        this.#dealCards();

    }

    #initPlayerNameInHtml(player, placesForName){

        for(let place = 0; place < placesForName.length; place++){
            placesForName[place].textContent = player.name
        }
        
    }

    #initPlayersStats(){

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

    }

    #appendCard(id, card){

        const cardsContainer  = this.bindById(id);

        cardsContainer.appendChild(card);

    }
}

export const game = new Game();