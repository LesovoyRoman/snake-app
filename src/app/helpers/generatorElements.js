'use strict';

import { elementToGenerate, fieldSizes, measurement, snakeElements, sizeElement } from "../configGame";
import SnakeCommon from './../classes/SnakeCommon'
import {separateElementSnakeBody, setStylesInstance} from "./bundle";

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
        if(SnakeCommon.direction === 'top' || SnakeCommon.direction === 'bottom') {
            Element.style.top =  separateElementSnakeBody( snakePartBody, 'top' ) + measurement
            Element.style.left = snakePartBody.style.left
        }
        /**
         * In row horizontally
         */
        else {
            Element.style.left = separateElementSnakeBody( snakePartBody, 'left' ) + measurement
            Element.style.top = snakePartBody.style.top
        }
    } else {
        Element.style.left = getRandomInt( 0, fieldSizes.width ) + measurement
        Element.style.top = getRandomInt( 0, fieldSizes.height ) + measurement
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
    if( simpleBlock ) setStylesInstance( snakeElements.common, newElement )

     snakePartBody ?
         setElementInline( newElement, snakePartBody )
         :
         placeElementTo( ...generateCoordinates(), newElement )

    return injectElement( newElement, Object )
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