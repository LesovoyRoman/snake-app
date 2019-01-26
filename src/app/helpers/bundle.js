'use strict';

import { measurement } from "../configGame";

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
 * Get value without the "measurement" (px, rem, em, in, etc..)
 *
 * @param Element
 * @param style
 * @returns {number}
 */
export function getValueNumberStyles( Element, style ) {
    return Element.style[ style ].split( measurement )[0] * 1
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

/**
 * Set attributes to instance
 *
 * @param attrs
 * @param InstanceElement
 */
export function setAttributes( attrs, InstanceElement ) {
    for ( let specificAttr in attrs ) InstanceElement[ specificAttr ] = attrs[ specificAttr ]
}