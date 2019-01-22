'use strict';

import {fieldSizes, measurement, sizeElement} from "../configGame";
import SnakeCommon from "../classes/SnakeCommon";

/**
 * Parse file with html
 *
 * @param template
 * @returns {Document}
 */
export function parseHtml( template ) {
    let parser = new DOMParser();
    return parser.parseFromString( template, 'text/html' );
}

/**
 * Uses to place on each Element depended on prev. Element
 *
 * @param Element
 * @param direction
 * @param versa
 * @returns {number}
 */
export function separateElementSnakeBody( Element, direction, versa = false ) {
    if( versa )
        return getValueNumberStyles( Element, direction ) - ( sizeElement + 2 )
    return getValueNumberStyles( Element, direction ) + ( sizeElement + 2 )
}

export function getValueNumberStyles( Element, style ) {
    return Element.style[ style ].split( measurement )[0] * 1
}

/**
 * Uses for moving through boards in game field
 *
 * @param Element
 * @param direction
 * @param index
 */
export function checkOutOfGameField( Element, direction, index ) {
    let positionInDirection = getValueNumberStyles( Element, direction )

    let border;
     direction === 'left' ?
         border = 'width'
     :
         border = 'height'

    /**
     * Set opposite position for each direction
     */
    if( index === 0 && ( positionInDirection < 0 || positionInDirection >= fieldSizes[ border ] ) ) {
        Element.style[ direction ] = fieldSizes[ border ] + measurement
    }  else if( positionInDirection < 0 || positionInDirection >= fieldSizes[ border ] ) {
        if ( positionInDirection >= fieldSizes[ border ] )
            Element.style[ direction ] = separateElementSnakeBody( SnakeCommon.snakeBody.childNodes[ index - 1 ], direction,  true ) + measurement

        if( positionInDirection < 0 )
            Element.style[ direction ] = separateElementSnakeBody( SnakeCommon.snakeBody.childNodes[ index - 1], direction ) + measurement
    }
}

/**
 * Bind template to specific element
 *
 * @param object
 * @param template
 * @param selector
 */
export function bindTemplate( object, template, selector ) {
    let shadow = object.attachShadow ( { mode: "open" } )
    let sample = template.querySelector( selector )
    shadow.appendChild ( sample.content )
    return object
}

/**
 * Singleton
 *
 * @param Object
 * @param Instance
 * @returns {*}
 */
export function singleton( Object, Instance ) {
    if ( Object.singleton ) {
        throw new Error('Singleton instance of ' + Object.name + ' already exists, use {Object}.getInstance()');
    }
    Object.singleton = Instance;
    return Object;
}

/**
 * Set styles to instance
 *
 * @param styles
 * @param InstanceElement
 */
export function setStylesInstance( styles, InstanceElement ) {
    for ( let specificStyle in styles ) InstanceElement.style[ specificStyle ] = styles[ specificStyle ]
}