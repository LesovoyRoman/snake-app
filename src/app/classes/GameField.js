'use strict';

import template from './../components/GameField.html'
import {parseHtml, bindTemplate, singleton} from './../helpers/bundle'
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
        for ( let specificStyle in gameField ) GameField.gameFieldToInject.style[ specificStyle ] = gameField[ specificStyle ]

        /**
         * Generate first block
         */
        generateElement( GameField.gameFieldToInject )
    }

    /**
     * @returns {GameField}
     */
    static getInstance() {
        return this;
    }
}
