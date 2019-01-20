'use strict';

import { elementToGenerate, fieldSizes, measurement, snakeElements } from "../configGame";
import SnakeCommon from './../classes/SnakeCommon'

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
 * @param ParentNode
 */
export function placeElementTo( x, y, Element ) {
    Element.style.left = x + measurement;
    Element.style.top = y + measurement;

    return Element
}

/**
 * Set Element to be inline
 *
 * @param Element
 * @returns {*}
 */
export function setElementInline(Element, snakePartBody ) {
    Element.style.position = 'absolute'
    Element.style.top = '1px'
    Element.style.left = '0px'

    /**
     * Place blocks vertically or horizontally
     */
    if( typeof snakePartBody.style !== 'undefined' ) {
        SnakeCommon.directionVertically ?
            Element.style.top = ((snakePartBody.style.top.split('px')[0] * 1) + 6) + measurement
            :
            Element.style.left = ((snakePartBody.style.left.split('px')[0] * 1) + 6) + measurement
    }

    return Element
}

/**
 * Styles for common blocks
 *
 * @param Element
 */
export function stylizeElementCommon( Element ) {
    for ( let specificStyle in snakeElements.common ) {
        Element.style[ specificStyle ] = snakeElements.common[ specificStyle ]
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
    if( simpleBlock ) stylizeElementCommon( newElement )
    if( snakePartBody ) setElementInline( newElement, snakePartBody )
    if( !snakePartBody ) placeElementTo( ...generateCoordinates(), newElement )

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