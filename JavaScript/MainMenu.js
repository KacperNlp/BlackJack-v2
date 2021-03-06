import { BindToHtml } from './scripts/BindToHtml.js';
import { settings, SETTINGS_LAYER_ID } from './scripts/Settings.js';
import { HIDDEN_LAYER, visibilityOfLayers, VISIBLE_LAYER } from './scripts/VisibilityOfLayers.js';
import { game } from './scripts/Game.js'
import { animation } from './scripts/Animations.js';

const FIRST_PLAYER_NAME_INPUT_ID = 'first-player';
const MAIN_MENU_LAYER_ID = 'main-menu'
const NEW_GAME_WITH_PLAYER_BUTTON_ID = 'new-game-with-player';
const NEW_GAME_WITH_AI_BUTTON_ID = 'new-game-with-AI';
const SECOND_PLAYER_NAME_INPUT_ID = 'second-player';
const SETTINGS_BUTTON_ID = 'settings-button';
const WALLET_CASH_INPUT_ID = 'wallet-settings';

class MainMenu extends BindToHtml {
    constructor() {
        super(MAIN_MENU_LAYER_ID);
        this.#init();
    }

    #init() {
        this.#withPlayerButtonHandle();
        this.#withAIButtonHandle();
        this.#handleSettingsButton();
    }

    #withPlayerButtonHandle() {
        const button = this.bindById(NEW_GAME_WITH_PLAYER_BUTTON_ID);

        button.addEventListener('click', () => {
            visibilityOfLayers.changeVisibility(settings.layer, VISIBLE_LAYER);
            animation.inputAnimation(`#${SETTINGS_LAYER_ID}`);//input animation
            settings.withAI = false;
        })
    }

    #withAIButtonHandle() {
        const button = this.bindById(NEW_GAME_WITH_AI_BUTTON_ID);

        button.addEventListener('click', () => {
            visibilityOfLayers.changeVisibility(settings.layer, VISIBLE_LAYER);
            animation.inputAnimation(`#${SETTINGS_LAYER_ID}`);//input animation
            settings.withAI = true;
        })

    }

    #handleSettingsButton() {
        const button = this.bindById(SETTINGS_BUTTON_ID);

        button.addEventListener('click', this.#handleSettingsForm);
    }

    #handleSettingsForm = (event) => {
        event.preventDefault();

        const firstPlayerInputValue = this.bindById(FIRST_PLAYER_NAME_INPUT_ID).value;
        const secondPlayerInputValue = this.bindById(SECOND_PLAYER_NAME_INPUT_ID).value;
        const walletInputValue = this.bindById(WALLET_CASH_INPUT_ID).value;

        const firstName = firstPlayerInputValue ? firstPlayerInputValue : 'Player';
        const secondName = secondPlayerInputValue ? secondPlayerInputValue : 'Croupier';
        const walletCash = walletInputValue ? walletInputValue : 1000;

        settings.getInitialSettings(firstName, secondName, walletCash);

        if (walletCash < 100) return;

        animation.outputAnimation(`#${SETTINGS_LAYER_ID}`);//output animation

        game.initGame();

        visibilityOfLayers.changeVisibility(game.layer, VISIBLE_LAYER);
        visibilityOfLayers.changeVisibility(this.layer, HIDDEN_LAYER);

        //time for output animation
        setTimeout(() => {
            visibilityOfLayers.changeVisibility(settings.layer, HIDDEN_LAYER);
        }, 400)
    }

}

export const mainMenu = new MainMenu();