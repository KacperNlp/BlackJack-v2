import {BindToHtml} from './BindToHtml.js'

const SETTINGS_LAYER_ID = 'settings-layer';

class Settings extends BindToHtml{
    constructor(){
        super(SETTINGS_LAYER_ID);

        this.firstPlayer = null;
        this.secondPlayer = null;
        this.walletCash = null;
    }
}

export const settings = new Settings();