import {BindToHtml} from './scripts/BindToHtml.js';
import {settings} from './scripts/Settings.js';
import {HIDDEN_LAYER, visibilityOfLayers, VISIBLE_LAYER} from './scripts/VisibilityOfLayers.js';
import {game} from './scripts/Game.js'

//main menu buttons id
const NEW_GAME_WITH_PLAYER_BUTTON_ID = 'new-game-with-player';
const NEW_GAME_WITH_AI_BUTTON_ID = 'new-game-with-AI';

//settings form inputs ID
const FIRST_PLAYER_NAME_INPUT_ID = 'first-player';
const SECOND_PLAYER_NAME_INPUT_ID = 'second-player';
const WALLET_CASH_INPUT_ID = 'wallet-settings';

const SETTINGS_BUTTON_ID = 'settings-button';

const MAIN_MENU_LAYER_ID = 'main-menu'

class MainMenu extends BindToHtml{
    constructor(){
        super(MAIN_MENU_LAYER_ID);
        this.#init();
    }

    #init(){
        this.#withPlayerButtonHandle();
        this.#withAIButtonHandle();
        this.#handleSettingsButton();
    }

    #withPlayerButtonHandle(){

        const button = this.bindById(NEW_GAME_WITH_PLAYER_BUTTON_ID);

        button.addEventListener('click', () =>{
            visibilityOfLayers.changeVisibility(settings.layer, VISIBLE_LAYER);
            settings.withAI = false;
        })

    }

    #withAIButtonHandle(){

        const button = this.bindById(NEW_GAME_WITH_AI_BUTTON_ID);

        button.addEventListener('click', () =>{
            visibilityOfLayers.changeVisibility(settings.layer, VISIBLE_LAYER);
            settings.withAI = true;
        })

    }

    #handleSettingsButton(){

        const button = this.bindById(SETTINGS_BUTTON_ID);

        button.addEventListener('click', this.#handleSettingsForm);

    }

    #handleSettingsForm = (event) =>{

        event.preventDefault();

        const firstPlayerInputValue = this.bindById(FIRST_PLAYER_NAME_INPUT_ID).value;
        const secondPlayerInputValue = this.bindById(SECOND_PLAYER_NAME_INPUT_ID).value;
        const walletInputValue = this.bindById(WALLET_CASH_INPUT_ID).value;

        const firstName = firstPlayerInputValue ? firstPlayerInputValue : 'Player';
        const secondName = secondPlayerInputValue ? secondPlayerInputValue : 'Dealer';
        const walletCash = walletInputValue ? walletInputValue : 1000;

        settings.getInitialSettings(firstName, secondName, walletCash);

        game.initGame();

        visibilityOfLayers.changeVisibility(this.layer, HIDDEN_LAYER);
        visibilityOfLayers.changeVisibility(settings.layer, HIDDEN_LAYER);
        visibilityOfLayers.changeVisibility(game.layer, VISIBLE_LAYER)
    }

}


export const mainMenu = new MainMenu();