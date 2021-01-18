import { BindToHtml } from "./BindToHtml.js";
import { HIDDEN_LAYER, visibilityOfLayers, VISIBLE_LAYER } from './VisibilityOfLayers.js'
import {mainMenu} from '../MainMenu.js'
import {game} from './Game.js'
 

//round message
const ROUND_MESSAGE_LAYER_ID ='round-message';
const ROUND_MESSAGE_CONTENT_ID = 'round-winner-name';
const ROUND_MESSAGE_BUTTON_ID = 'round-message-button';

//end of game message
const END_OF_GAME_MESSAGE_LAYER_ID ='end-of-game-message';
const END_OF_GAME_MESSAGE_CONTENT_ID = 'end-of-game-message-winner-name';
const END_OF_GAME_MESSAGE_NUMBER_OF_ROUNDS_ID = 'end-of-game-message-rounds';
const END_OF_GAME_MESSAGE_BUTTON_ID = 'end-game-message-button';

class Message extends BindToHtml{
    constructor(){
        super();

        this.messageForEndOfRound = {
            layer:this.bindById(ROUND_MESSAGE_LAYER_ID),
            content:this.bindById(ROUND_MESSAGE_CONTENT_ID ), 
            button: this.bindById(ROUND_MESSAGE_BUTTON_ID),
        };

        this.messageForEndOfGame = {
            layer:this.bindById(END_OF_GAME_MESSAGE_LAYER_ID),
            content:this.bindById(END_OF_GAME_MESSAGE_CONTENT_ID),
            rounds: this.bindById(END_OF_GAME_MESSAGE_NUMBER_OF_ROUNDS_ID),
            button: this.bindById(END_OF_GAME_MESSAGE_BUTTON_ID),
        };
    }

    //round message
    initRoundMessage(winner){
        const {button, layer} = this.messageForEndOfRound;

        this.#initRoundMessageContent(winner);

        button.addEventListener('click', ()=>{
            visibilityOfLayers.changeVisibility(layer, HIDDEN_LAYER);
        })
    }

    #initRoundMessageContent(winner){
        const {content} = this.messageForEndOfRound;

        content.textContent = winner;
    }

    //end of game message
    initEndOfGameMessage(winner, numberOfRounds){
        const {button, layer} = this.messageForEndOfGame;

        this.#initEndOfGameMessageContent(winner, numberOfRounds);

        button.addEventListener('click', ()=>{

            game.cleanCardsContainer();

            visibilityOfLayers.changeVisibility(layer, HIDDEN_LAYER);
            visibilityOfLayers.changeVisibility(game.layer, HIDDEN_LAYER);
            visibilityOfLayers.changeVisibility(mainMenu.layer, VISIBLE_LAYER);

        })
    }

    #initEndOfGameMessageContent(winner, numberOfRounds){
        const {content, rounds} = this.messageForEndOfGame;

        content.textContent = winner;
        rounds.textContent = numberOfRounds;
    }

}


export const message = new Message();