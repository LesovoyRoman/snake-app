'use strict';

import { elementToGenerate, fieldSizes, measurement, snakeElements, directions, simpleElements } from "../configGame";
import SnakeCommon from './../classes/SnakeCommon'
import * as bundle from "./bundle";

/**
 * Generate value from min to max
 *
 * @param min
 * @param max
 * @returns {number}
 */
export function getRandomInt( min, max ) {
    min = Math.ceil( min );
    max = Math.floor( max );
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

/**
 * Generate coordinates
 * @returns {number[]}
 */
export function generateCoordinates() {
    return [
        getRandomInt( 0, fieldSizes.width ),
        getRandomInt( 0, fieldSizes.height )
    ]
}

/**
 * Place to
 *
 * @param x
 * @param y
 * @param Element
 */
export function placeElementTo( x, y, Element ) {
    Element.style.left = x + measurement;
    Element.style.top = y + measurement;

    return Element
}

/**
 * Place blocks vertically or horizontally inline
 *
 * @param Element
 * @param snakePartBody
 * @returns {*}
 */
export function setElementInline( Element, snakePartBody ) {
    Element.style.position = 'absolute'

    /**
     * Check if part of body not first and put element after prev.
     */
    if( typeof snakePartBody.style !== 'undefined' ) {
        /**
         * In row vertically
         */
        if( SnakeCommon.direction === directions.top || SnakeCommon.direction === directions.bottom ) {
            Element.style.top =  SnakeCommon.separateElementSnakeBody( snakePartBody, directions.top ) + measurement
            Element.style.left = snakePartBody.style.left
        }
        /**
         * In row horizontally
         */
        else {
            Element.style.left = SnakeCommon.separateElementSnakeBody( snakePartBody, directions.left ) + measurement
            Element.style.top = snakePartBody.style.top
        }
    } else {
        /**
         * -> Put Snake on the center
         * ( Snake body can not be generated out of the board! )
         *
         * @type {string}
         */
        Element.style.left = parseInt( parseInt( fieldSizes.width - ( SnakeCommon.lengthElements * 4 ) ) / 2 ) + measurement
        Element.style.top = parseInt( parseInt( fieldSizes.height - ( SnakeCommon.lengthElements * 4 ) ) / 2 ) + measurement
    }

    return Element
}

/**
 * Generate elem
 *
 * @returns {*}
 */
export function generateElement( Object, simpleBlock = false, snakePartBody = false ) {
    let newElement = document.createElement( elementToGenerate )

    /**
     * Common style objects
     */
    if( simpleBlock ) bundle.setStylesInstance( snakeElements.common, newElement )

    /**
     * Styles simple elements
     */
    if( !snakePartBody ) bundle.setStylesInstance( simpleElements.common, newElement )

    snakePartBody ?
         setElementInline( newElement, snakePartBody )
         :
         placeElementTo( ...generateCoordinates(), newElement )

    return injectElement( newElement, Object );
}

/**
 * Inject element
 *
 * @param Element
 * @param ParentNode
 */
export function injectElement( Element, ParentNode ) {
    ParentNode.appendChild( Element )
    return Element
}