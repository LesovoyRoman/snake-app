'use strict';

import { elementToGenerate, fieldSizes, measurement, snakeElements, directions, simpleElements, sizeElement } from "../configGame";
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
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min
}

/**
 * Generate coordinates
 *
 * ( but place where snake can achieve this )
 *
 * @returns {number[]}
 */
export function generateCoordinates() {
    return [
        getRandomInt( sizeElement, (fieldSizes.width / sizeElement) - sizeElement ) * sizeElement,
        getRandomInt( sizeElement, (fieldSizes.height / sizeElement) - sizeElement ) * sizeElement
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
 * @param eatenElement
 * @returns {*}
 */
export function setElementInline( Element, snakePartBody, eatenElement = false ) {
    Element.style.position = 'absolute'

    /**
     * Check if part of body not first and put Element after prev.
     */
    if( typeof snakePartBody.style !== 'undefined' ) {
        Element.direction = snakePartBody.direction
        /**
         * Put Element in a row vertically \ horizontally after prev.
         */
        switch ( Element.direction ){
            case directions.right:
                Element.style.left = SnakeCommon.separateElementSnakeBody( snakePartBody, directions.left, true, eatenElement ) + measurement
                Element.style.top = snakePartBody.style.top
                break
            case directions.left:
                Element.style.left = SnakeCommon.separateElementSnakeBody( snakePartBody, directions.left, false, eatenElement ) + measurement
                Element.style.top = snakePartBody.style.top
                break
            case directions.top:
                Element.style.top = SnakeCommon.separateElementSnakeBody( snakePartBody, directions.top, false, eatenElement ) + measurement
                Element.style.left = snakePartBody.style.left
                break
            case directions.bottom:
                Element.style.top = SnakeCommon.separateElementSnakeBody( snakePartBody, directions.top, true, eatenElement ) + measurement
                Element.style.left = snakePartBody.style.left
                break
            default:
                break;
        }
    } else {
        /**
         * -> Put Snake
         */
        Element.style.left = fieldSizes.width / 2 + measurement
        Element.style.top = fieldSizes.height / 2 + measurement
    }

    return Element
}

/**
 * Generate elem
 *
 * @returns {*}
 */
export function generateElement( Object, simpleBlock = false, snakePartBody = false, eatenElement = false ) {
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
         setElementInline( newElement, snakePartBody, eatenElement )
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