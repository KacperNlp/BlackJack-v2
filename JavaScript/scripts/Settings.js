import {BindToHtml} from './BindToHtml.js'

const SETTINGS_LAYER_ID = 'settings-layer';

class Settings extends BindToHtml{
    constructor(){
        super(SETTINGS_LAYER_ID);

        this.firstPlayerName = null;
        this.secondPlayerName = null;

        this.walletCash = null;
    }

    //AI
    #withAI = false;

    set withAI(value){
        this.#withAI = value;
    }

    get withAI(){
        return this.#withAI;
    }


    getInitialSettings(firstName, secondName, walletCash){
        this.firstPlayerName = firstName;
        this.secondPlayerName = secondName;
        this.walletCash = walletCash;
    }
}

export const settings = new Settings();