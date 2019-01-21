'use strict';

import template from './../components/SnakeCommon.html'
import { parseHtml, bindTemplate, singleton, setStylesInstance } from './../helpers/bundle'
import { snake } from "../configGame";
import { generateElement } from "../helpers/generatorElements";

export default class SnakeCommon extends HTMLElement {
    constructor() {
        super();
        singleton( SnakeCommon, this )
        bindTemplate( this, parseHtml( template ), "#snakeCommon" )

        SnakeCommon.snakeBody = this.shadowRoot.getElementById( 'snakeBody' );
        SnakeCommon.setStyles();
        SnakeCommon.direction = snake.direction;
        SnakeCommon.buildSnake();
    }

    /**
     * @returns {SnakeCommon}
     */
    static getInstance() {
        return this;
    }

    static setStyles() {
        return setStylesInstance( snake.settable, SnakeCommon.snakeBody )
    }

    static buildSnake() {
        let generatedElement = true;
        for ( let i = 0; i < snake.length; i++ ) {
            generatedElement = generateElement( SnakeCommon.snakeBody, true, generatedElement )
        }
    }

    static multiplySnake() {

    }

    static changeDirection( direction ) {
        SnakeCommon.direction = direction
    }
}