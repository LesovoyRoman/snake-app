'use strict';

import template from './../components/SnakeCommon.html'
import { parseHtml, bindTemplate, singleton, getValueNumberStyles, setAttributes } from './../helpers/bundle'
import { snake, sizeElement, measurement, snakeElements, fieldSizes, directions, allowThroughBorders } from "../configGame";
import { generateElement } from "../helpers/generatorElements";
import SnakeApp from "./SnakeApp";
import GameField from "./GameField"

export default class SnakeCommon extends HTMLElement {
    constructor() {
        super();
        singleton( SnakeCommon, this )
        bindTemplate( this, parseHtml( template ), "#snakeCommon" )

        SnakeCommon.snakeBody = this.shadowRoot.getElementById( 'snakeBody' );
        SnakeCommon.setStyles();
        SnakeCommon.direction = snake.direction;

        SnakeCommon.lengthElements = snake.length;

        SnakeCommon.initHistoryDirections();
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

    static initHistoryDirections() {
        return SnakeCommon.historyDirections = {
            right: [],
            left: [],
            top: [],
            bottom: []
        }
    }

    static buildSnake() {
        let generatedElement = true;
        for ( let i = 0; i < snake.length; i++ ) {
            generatedElement = generateElement( SnakeCommon.snakeBody, true, generatedElement )
            setAttributes( snakeElements.attributes, generatedElement )
        }
        SnakeCommon.snakeBody.childNodes[0].style.background = snake.headColor;
    }

    static multiplySnake() {
        generateElement(
            SnakeCommon.snakeBody,
            true,
            SnakeCommon.snakeBody.childNodes[ SnakeCommon.snakeBody.childNodes.length - 1 ],
            true
        )
    }

    static compareHistoryDirectionsByCurrentStep( currentStep, Instance, index ) {
        /**
         * Go through each direction
         */
        for ( let specificDirection in SnakeCommon.historyDirections ) {

            /**
             * Go through each saved value in direction ( step which was saved )
             */
            SnakeCommon.historyDirections[specificDirection].forEach( (e, indexStep)  => {

                /**
                 * Check if it's time to turn for Element -> then change direction
                 */
                if( currentStep === ( e  + index + 1) ) Instance.direction = specificDirection;

                /**
                 * Clean step in directions (after last element turned)
                 */
                if ( currentStep === ( e  + index + 1 ) && ( index + 1 ) === SnakeCommon.snakeBody.childNodes.length )
                    SnakeCommon.historyDirections[specificDirection].splice(indexStep, 1);
            } )

        }

    }

    /**
     * Move snake in current direction for each Element
     *
     * @param countedSteps
     */
    static moveSnake( countedSteps ) {
        SnakeCommon.snakeBody.childNodes.forEach( ( Element, index ) => {
            /**
             * Check if ate simple element
             */
            GameField.elementsActive.forEach( ( E, index ) => {
                   if(SnakeCommon.compareHeadSnakeWithElementPosition( E )
                    && Element === SnakeCommon.snakeBody.childNodes[0]) {
                        SnakeCommon.multiplySnake();
                        GameField.cleanElementsActive( E, index );
                        GameField.callGenerateElement();
                   }
            });

            /**
             * Check if snake ate itself
             */
            SnakeCommon.compareHeadSnakeWithElementPosition( Element )
                && Element !== SnakeCommon.snakeBody.childNodes[0] ?
                    SnakeApp.endGame() : null;

            /**
             * Compare arrays of directions and set specific Element direction
             */
            SnakeCommon.compareHistoryDirectionsByCurrentStep( countedSteps, Element, index );

            /**
             * Move specific Element
             */
            SnakeCommon.moveToSpecificDirection( Element );

            /**
             * When snake get out of the boards -> it comes back in opposite side
             */
            SnakeCommon.checkOutOfGameField( Element, index );
        })
    }

    static changeDirection( direction ) {

        /**
         * Game paused
         */
        if(SnakeApp.paused) return;

        if( ( direction === directions.right || direction === directions.left ) 
            && 
            ( SnakeCommon.direction === directions.left || SnakeCommon.direction === directions.right ) )
            throw 'You can not turn to opposite side';

        if( ( direction === directions.top || direction === directions.bottom ) 
            && 
            ( SnakeCommon.direction === directions.top || SnakeCommon.direction === directions.bottom ) )
            throw 'You can not turn to opposite side';

        /**
         * Change direction of main element (head)
         */
        SnakeCommon.snakeBody.childNodes[0].direction = direction

        /**
         * Set new direction in history
         */
        SnakeCommon.historyDirections[ direction ].push( SnakeApp.countedSteps )

        /**
         * Just in case -> set snake direction
         */
        return SnakeCommon.direction = direction
    }

    /**
     * Uses to move specific Element to specific direction
     *
     * @param Element
     * @returns {*}
     */
    static moveToSpecificDirection( Element ) {
        switch ( Element.direction ) {
            case directions.top:
                Element.style[ directions.top ] = getValueNumberStyles( Element, directions.top ) - sizeElement + measurement
                break;
            case directions.bottom:
                Element.style[ directions.top ] = getValueNumberStyles( Element, directions.top ) + sizeElement + measurement
                break;
            case directions.right:
                Element.style[ directions.left ] = getValueNumberStyles( Element, directions.left ) + sizeElement + measurement
                break;
            case directions.left:
                Element.style[ directions.left ] = getValueNumberStyles( Element, directions.left ) - sizeElement + measurement
                break;
        }
        return Element;
    }

    /**
     * Uses for moving through boards in game field
     *
     * @param Element
     * @param index
     */
    static checkOutOfGameField( Element, index ) {
        let direction;
        Element.direction === directions.top || Element.direction === directions.bottom ?
            direction = directions.top : direction = directions.left;

        let positionInDirection = getValueNumberStyles( Element, direction )

        let border;
        direction === directions.left ?
            border = 'width'
            :
            border = 'height'

        /**
         * Set opposite position for each direction
         *
         * ( Check if Element went through border and put it to closest prev. Element of Snake body )
         */

        let comparedPosition = SnakeCommon.compareElementPositionWithBoards( positionInDirection, border );

        /**
         * Not allowed go through boards
         */
        if( comparedPosition && !allowThroughBorders ) {
            SnakeApp.endGame();
            return;
        }

        switch ( comparedPosition ) {
            /**
             * Head of snake
             */
            case index === 0 && comparedPosition:
                if ( comparedPosition === 1 ) Element.style[ direction ] = 0 + measurement
                if ( comparedPosition === 2 ) Element.style[ direction ] = fieldSizes[ border ] + measurement
                break;
            case index !== 0 && comparedPosition:
                /**
                 * Right \ Bottom
                 */
                if ( comparedPosition === 1 )
                    Element.style[ direction ] = SnakeCommon.separateElementSnakeBody( SnakeCommon.snakeBody.childNodes[ index - 1 ], direction,  true ) + measurement
                /**
                 * Left \ Top
                 */
                if ( comparedPosition === 2 )
                    Element.style[ direction ] = SnakeCommon.separateElementSnakeBody( SnakeCommon.snakeBody.childNodes[ index - 1 ], direction ) + measurement
                break;
            default:
                break;

        }
    }

    /**
     * Uses to place on each Element depended on prev. Element
     *
     * @param Element
     * @param direction
     * @param versa
     * @param eatenElement
     * @returns {number}
     */
    static separateElementSnakeBody( Element, direction, versa = false, eatenElement = false ) {
        let increaseDecrease;
        eatenElement ?
            increaseDecrease = 0 : increaseDecrease = sizeElement
        if( versa )
            return getValueNumberStyles( Element, direction ) - increaseDecrease
        return getValueNumberStyles( Element, direction ) + increaseDecrease
    }

    /**
     * Check if out of board by position
     *
     * @param positionInDirection
     * @param border
     * @returns {number}
     */
    static compareElementPositionWithBoards( positionInDirection, border ) {

        if( positionInDirection >= fieldSizes[ border ] ) return 1;

        if( positionInDirection < 0 ) return 2;

        return 0;
    }

    /**
     * Check if head stuck into body
     *
     * @param Element
     * @returns {boolean}
     */
    static compareHeadSnakeWithElementPosition( Element ) {
        return (
            getValueNumberStyles( Element, directions.left )
            === getValueNumberStyles( SnakeCommon.snakeBody.childNodes[0], directions.left )
        &&
            getValueNumberStyles( Element, directions.top )
            === getValueNumberStyles( SnakeCommon.snakeBody.childNodes[0], directions.top )
        )
    }
}