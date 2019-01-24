'use strict';

import template from './../components/SnakeCommon.html'
import { parseHtml, bindTemplate, singleton, checkOutOfGameField, getValueNumberStyles } from './../helpers/bundle'
import { snake, sizeElement, measurement } from "../configGame";
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
        SnakeCommon.snakeBody.childNodes[0].style.background = snake.headColor;
    }

    // @todo function to increase snake
    static multiplySnake() {

    }

    static moveSnakeTo( x, back ) {
        back ?
                SnakeCommon.snakeBody.childNodes.forEach( ( Element, index ) => {
                    Element.style[ x ? 'left' : 'top' ] =
                        getValueNumberStyles( Element, x ? 'left' : 'top' ) - sizeElement + measurement

                    checkOutOfGameField( Element, x ? 'left' : 'top', index )
                })
            :
                SnakeCommon.snakeBody.childNodes.forEach( ( Element, index ) => {
                    Element.style[ x ? 'left' : 'top' ] =
                        getValueNumberStyles( Element, x ? 'left' : 'top' ) + sizeElement + measurement

                    checkOutOfGameField( Element, x ? 'left' : 'top', index )
                })
    }

    /**
     * Move snake in current direction
     *
     * @param countedSteps
     */
    static moveSnake( countedSteps ) {
        switch ( SnakeCommon.direction ) {
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

    static changeDirection( direction ) {

        if( ( direction === 'right' || direction === 'left' ) && ( SnakeCommon.direction === 'left' || SnakeCommon.direction === 'right' ) ) return;
        if( ( direction === 'top' || direction === 'bottom' ) && ( SnakeCommon.direction === 'top' || SnakeCommon.direction === 'bottom' ) ) return;

        return SnakeCommon.direction = direction
    }
}