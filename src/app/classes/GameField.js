'use strict';

import template from './../components/GameField.html'
import { parseHtml, bindTemplate, generateCoordinates } from './../helpers/bundle'
import { gameField, elementToGenerate, measurement } from "../configGame";

export default class GameField extends HTMLElement {
    constructor() {
        super();

        bindTemplate( this, parseHtml( template ), "#field" )

        /**
         * Set styles from configGame.js
         *
         * @type {HTMLElement}
         */
        this.gameFieldToInject = this.shadowRoot.getElementById( 'gameField' );
        for ( let specificStyle in gameField ) this.gameFieldToInject.style[ specificStyle ] = gameField[ specificStyle ]

        this.generateElement()
    }

    /**
     * Find types in configGame.js
     * @param type
     */
    generateElement() {
         let newElement = document.createElement( elementToGenerate )
         return this.placeElementTo( ...generateCoordinates(), newElement )
    }

    placeElementTo( x, y, Element ) {
        Element.style.position = 'absolute';
        Element.style.left = x + measurement;
        Element.style.top = y + measurement;

        return this.injectElement( Element )
    }

    injectElement( Element ) {
        this.gameFieldToInject.appendChild( Element )
    }

}
