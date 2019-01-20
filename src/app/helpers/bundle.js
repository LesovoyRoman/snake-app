'use strict';

import { fieldSizes } from "../configGame";

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