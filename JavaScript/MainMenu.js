import {BindToHtml} from './scripts/BindToHtml.js';
import {settings} from './scripts/Settings.js';
import {visibilityOfLayers, VISIBLE_LAYER} from './scripts/VisibilityOfLayers.js';

//main menu buttons id
const NEW_GAME_WITH_PLAYER_BUTTON_ID = 'new-game-with-player';
const NEW_GAME_WITH_AI_BUTTON_ID = 'new-game-with-AI';

const MAIN_MENU_LAYER_ID = 'main-menu'

class MainMenu extends BindToHtml{
    constructor(){
        super(MAIN_MENU_LAYER_ID);
        this.#init();
    }

    #init(){
        this.#withPlayerButtonHandle();
        this.#withAIButtonHandle();
    }

    #withPlayerButtonHandle(){

        const button = this.bindById(NEW_GAME_WITH_PLAYER_BUTTON_ID);

        button.addEventListener('click', () =>{
            visibilityOfLayers.changeVisibility(VISIBLE_LAYER, settings.layer);
        })

    }

    #withAIButtonHandle(){

        const button = this.bindById(NEW_GAME_WITH_AI_BUTTON_ID);

        button.addEventListener('click', () =>{
            visibilityOfLayers.changeVisibility(VISIBLE_LAYER, settings.layer);
        })

    }

}


export const mainMenu = new MainMenu();