import {CardTypesSigns} from './Deck.js'

export class Card{
    constructor(type, weight){
        this.type = type;
        this.weight = weight;
    }

    render(){
        const card = document.createElement('div');
        card.innerHTML = `${this.weight} ${CardTypesSigns[this.type]}`
        card.setAttribute('class', `${this.type} card`)
        return card;
    }
}