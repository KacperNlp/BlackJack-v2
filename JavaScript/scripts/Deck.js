import {Card} from './Card.js'

const CardsWeights = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
];

const CardsTypes = ['hearts', 'spades', 'diamonds', 'clubs'];

export const CardTypesSigns = {
    hearts: '&hearts;',
    spades: '&spades;',
    diamonds: '&diams;',
    clubs: '&clubs;',
}

export class Deck{
    constructor() {
        this.cards = [];
        this.#generateCards();
    }

    #generateCards() {
        CardsTypes.forEach(type =>{
            CardsWeights.forEach(weight => {
                this.cards.push(new Card(type, weight));
            })
        })
    }

    shuffle() {
        for(let i = this.cards.length - 1; i > 0; i--){
            const randomCardId = Math.floor(Math.random() * i);
            [
                this.cards[i], 
                this.cards[randomCardId]
            ]
             = 
             [
                this.cards[randomCardId], 
                this.cards[i]
            ]
        }
    }

    pickOne(){
        return this.cards.pop();
    }
}