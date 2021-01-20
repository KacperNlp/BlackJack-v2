import { BindToHtml } from "./BindToHtml.js";
import { HIDDEN_LAYER, visibilityOfLayers, VISIBLE_LAYER } from './VisibilityOfLayers.js'
import {mainMenu} from '../MainMenu.js'
import {game} from './Game.js'
import {animation} from './Animations.js'
  
//end of game and round message
export const END_OF_GAME_MESSAGE_LAYER_ID ='end-of-game-message';
const END_OF_GAME_MESSAGE_CONTENT_ID = 'end-of-game-message-winner-name';
const END_OF_GAME_MESSAGE_NUMBER_OF_ROUNDS_ID = 'end-of-game-message-rounds';
const END_OF_GAME_MESSAGE_BUTTON_ID = 'end-game-message-button';
export const ROUND_MESSAGE_LAYER_ID ='round-message';
const ROUND_MESSAGE_CONTENT_ID = 'round-winner-name';
const ROUND_MESSAGE_BUTTON_ID = 'round-message-button';

class Message extends BindToHtml{
    constructor() {
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
    initRoundMessage(winner) {
        const {button} = this.messageForEndOfRound;

        this.#initRoundMessageContent(winner);

        button.addEventListener('click', this.#roundMessageButtonHandle)
    }

    #roundMessageButtonHandle = (event) => {
        const {layer} = message.messageForEndOfRound;

        event.target.removeEventListener(event.type, this.#roundMessageButtonHandle);
        game.nextRoundInit();
        animation.outputAnimation(`#${ROUND_MESSAGE_LAYER_ID}`)

        //time for output animation
        setTimeout(()=>{
            visibilityOfLayers.changeVisibility(layer, HIDDEN_LAYER);
        },500)
    } 

    #initRoundMessageContent(winner) {
        const {content} = this.messageForEndOfRound;

        content.textContent = winner;
    }

    //end of game message
    initEndOfGameMessage(winner, numberOfRounds) {
        const {button, layer} = this.messageForEndOfGame;

        this.#initEndOfGameMessageContent(winner, numberOfRounds);

        button.addEventListener('click', () => {

            game.cleanCardsContainer();

            visibilityOfLayers.changeVisibility(game.layer, HIDDEN_LAYER);
            visibilityOfLayers.changeVisibility(mainMenu.layer, VISIBLE_LAYER);

            animation.outputAnimation(`#${END_OF_GAME_MESSAGE_LAYER_ID}`);

            //time for output animation
            setTimeout(()=>{
                visibilityOfLayers.changeVisibility(layer, HIDDEN_LAYER);
            },400)

        })
    }

    #initEndOfGameMessageContent(winner, numberOfRounds){
        const {content, rounds} = this.messageForEndOfGame;

        content.textContent = winner;
        rounds.textContent = numberOfRounds;
    }

}


export const message = new Message();