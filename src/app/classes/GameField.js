'use strict';

import template from './../components/GameField.html'
import { parseHtml, bindTemplate, singleton, setStylesInstance } from './../helpers/bundle'
import { gameField } from "../configGame";
import { generateElement } from "../helpers/generatorElements";

export default class GameField extends HTMLElement {
    constructor() {
        super();
        singleton( GameField, this )

        bindTemplate( this, parseHtml( template ), "#field" )

        /**
         * Set styles from configGame.js
         *
         * @type {HTMLElement}
         */
        GameField.gameFieldToInject = this.shadowRoot.getElementById( 'gameField' );

        GameField.setStyles();

        GameField.score = 0;

        GameField.elementsActive = [];

        /**
         * Generate first block
         */
        GameField.callGenerateElement();
    }

    static cleanElementsActive( Element, index ) {
        GameField.score++;
        GameField.setScoreView();
        Element.remove()
        return GameField.elementsActive.splice( index, 1 );
    }

    static setScoreView() {
        document.getElementById('score').innerText = "Score: " + GameField.score;
    }

    /**
     * Uses to make new elements
     *
     * @returns {Number}
     */
    static callGenerateElement() {
        return GameField.elementsActive.push(
            generateElement( GameField.gameFieldToInject, true, false )
        )
    }

    /**
     * @returns {GameField}
     */
    static getInstance() {
        return this;
    }

    static setStyles() {
        return setStylesInstance( gameField, GameField.gameFieldToInject )
    }
}
