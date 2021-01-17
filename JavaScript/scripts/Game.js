import {BindToHtml} from './BindToHtml.js';
import {Player} from './Player.js';
import {settings} from './Settings.js'

const GAME_LAYER_ID = 'game';

class Game extends BindToHtml{
    constructor(){
        super(GAME_LAYER_ID);

        this.firstPlayer = null;
        this.secondPlayer = null;
    }

    initGame(){
        this.firstPlayer = new Player(settings.firstPlayerName, settings.walletCash);
        this.firstPlayer = new Player(settings.secondPlayerName, settings.walletCash);
    }
}

export const game = new Game();