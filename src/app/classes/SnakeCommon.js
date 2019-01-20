'use strict';

import template from './../components/SnakeCommon.html'
import { parseHtml, bindTemplate, singleton } from './../helpers/bundle'
import { snake } from "../configGame";
import { generateElement } from "../helpers/generatorElements";

export default class SnakeCommon extends HTMLElement {
    constructor() {
        super();
        singleton( SnakeCommon, this )

        bindTemplate( this, parseHtml( template ), "#snakeCommon" )

        SnakeCommon.snakeBody = this.shadowRoot.getElementById( 'snakeBody' );
        for ( let specificStyle in snake.settable ) SnakeCommon.snakeBody.style[ specificStyle ] = snake.settable[ specificStyle ]

        SnakeCommon.directionVertically = snake.directionVertically;
        SnakeCommon.buildSnake();
    }

    /**
     * @returns {SnakeCommon}
     */
    static getInstance() {
        return this;
    }

    static buildSnake() {
        let generatedElement = true;
        for ( let i = 0; i < snake.length; i++ ) {
            generatedElement = generateElement( SnakeCommon.snakeBody, true, generatedElement )
        }
    }

    static multiplySnake() {

    }

    static changeDirection() {
        SnakeCommon.directionVertically = !SnakeCommon.directionVertically
    }
}