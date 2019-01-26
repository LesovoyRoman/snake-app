'use strict';

import template from './../components/SnakeCommon.html'
import { parseHtml, bindTemplate, singleton, getValueNumberStyles, setAttributes } from './../helpers/bundle'
import { snake, sizeElement, measurement, snakeElements, fieldSizes, directions } from "../configGame";
import { generateElement } from "../helpers/generatorElements";
import SnakeApp from "./SnakeApp";

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

    // @todo function to increase snake
    static multiplySnake() {
        SnakeCommon.lengthElements++;
    }

    // @todo needs to clean up sometimes!
    static compareHistoryDirectionsByCurrentStep( currentStep, Instance, index ) {

        /**
         * Go through each direction
         */
        for ( let specificDirection in SnakeCommon.historyDirections ) {

            /**
             * Go through each saved value in direction ( step which was saved )
             */
            SnakeCommon.historyDirections[specificDirection].forEach( e => {

                /**
                 * Check if it's time to turn for Element -> then change direction
                 */
                if( currentStep === ( e  + index + 1) ) Instance.direction = specificDirection;

                // @todo clean up when last element turned !
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
            let x;

            /**
             * Compare arrays of directions and set specific Element direction
             */
            SnakeCommon.compareHistoryDirectionsByCurrentStep( countedSteps, Element, index )

            /**
             * Move specific Element
             */
            SnakeCommon.moveToSpecificDirection( Element );

            /**
             * When snake get out of the boards -> it comes back in opposite side
             */
            Element.direction === directions.top || Element.direction === directions.bottom ?
                x = directions.top : x = directions.left;
            SnakeCommon.checkOutOfGameField( Element, x, index )
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
     * @param direction
     * @param index
     */
    static checkOutOfGameField( Element, direction, index ) {
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
        if( index === 0  ) {

            if ( positionInDirection < 0 ) Element.style[ direction ] = fieldSizes[ border ] + measurement
            if ( positionInDirection >= fieldSizes[ border ] ) Element.style[ direction ] = 0 + measurement

        }  else if( positionInDirection < 0 || positionInDirection >= fieldSizes[ border ] ) {

            /**
             * Right \ Bottom
             */
            if ( positionInDirection >= fieldSizes[ border ] )
                Element.style[ direction ] = SnakeCommon.separateElementSnakeBody( SnakeCommon.snakeBody.childNodes[ index - 1 ], direction,  true ) + measurement

            /**
             * Left \ Top
             */
            if( positionInDirection < 0 )
                Element.style[ direction ] = SnakeCommon.separateElementSnakeBody( SnakeCommon.snakeBody.childNodes[ index - 1 ], direction ) + measurement
        }
    }

    /**
     * Uses to place on each Element depended on prev. Element
     *
     * @param Element
     * @param direction
     * @param versa
     * @returns {number}
     */
    static separateElementSnakeBody( Element, direction, versa = false ) {
        if( versa )
            return getValueNumberStyles( Element, direction ) - ( sizeElement )
        return getValueNumberStyles( Element, direction ) + ( sizeElement )
    }
}