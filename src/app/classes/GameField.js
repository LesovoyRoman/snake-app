'use strict';

import template from './../components/GameField.html'
import { parseHtml, bindTemplate, getRandomInt } from './../helpers/bundle'
import { gameField, fieldSizes, elementToGenerate, measurement } from "../configGame";

export default class GameField extends HTMLElement {
    constructor() {
        super();

        bindTemplate( this, parseHtml( template ), "#field" )

        /**
         * Set styles from configGame.js
         *
         * @type {HTMLElement}
         */
        let shadowRootGameField = this.shadowRoot.getElementById( 'gameField' );
        for ( let specificStyle in gameField ) shadowRootGameField.style[ specificStyle ] = gameField[ specificStyle ]

        this.generateElement()
    }

    /**
     * Find types in configGame.js
     * @param type
     */
    generateElement() {
         let newElement = document.createElement( elementToGenerate )
         return this.placeElementTo( ...this.generateCoordinates(), newElement )
    }

    placeElementTo( x, y, Element ) {
        Element.style.position = 'absolute';
        Element.style.left = x + measurement;
        Element.style.top = y + measurement;

        return this.injectElement( Element )
    }

    injectElement( Element ) {
        this.shadowRoot.appendChild(Element)
    }

    generateCoordinates() {
        return [
            getRandomInt( 0, fieldSizes.width ),
            getRandomInt( 0, fieldSizes.height )
        ]
    }


}
