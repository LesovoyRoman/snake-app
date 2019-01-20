'use strict';

/**
 * @param template
 * @returns {Document}
 */
export function parseHtml( template ) {
    let parser = new DOMParser();
    return parser.parseFromString( template, 'text/html' );
}

/**
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