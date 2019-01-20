'use strict';

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