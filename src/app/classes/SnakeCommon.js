'use strict';

import template from './../components/SnakeCommon.html'
import { parseHtml, bindTemplate, singleton } from './../helpers/bundle'
import {snake, sizeElement, measurement} from "../configGame";
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

    }

    static buildSnake() {
        let generatedElement = true;
        for ( let i = 0; i < snake.length; i++ ) {
            generatedElement = generateElement( SnakeCommon.snakeBody, true, generatedElement )
        }
    }

    // @todo function to increase snake
    static multiplySnake() {

    }

    static moveSnakeTo(x, back) {
        back ?
                SnakeCommon.snakeBody.childNodes.forEach((e) => {
                    e.style[ x ? 'left' : 'top' ] = e.style[ x ? 'left' : 'top' ].split( measurement )[ 0 ] * 1 - sizeElement + measurement
                })
            :
                SnakeCommon.snakeBody.childNodes.forEach((e) => {
                    e.style[ x ? 'left' : 'top' ] = e.style[ x ? 'left' : 'top' ].split( measurement )[ 0 ] * 1 + sizeElement + measurement
                })
    }

    /**
     * Move snake in current direction
     *
     * @param countedSteps
     */
    static moveSnake(countedSteps) {
        switch (SnakeCommon.direction) {
            case 'right':
                SnakeCommon.moveSnakeTo(true, true);
                break;

            case 'left':
                SnakeCommon.moveSnakeTo(true, false);
                break;

            case 'top':
                SnakeCommon.moveSnakeTo(false, false);
                break;

            case 'bottom':
                SnakeCommon.moveSnakeTo(false, true);
                break;
        }
    }

    // @todo needs to change body of snake
    static changeDirection( direction ) {
        SnakeCommon.direction = direction
    }
}