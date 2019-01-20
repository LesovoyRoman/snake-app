'use strict';

/**
 * @param Elements
 */
export function defineElements( Elements ) {
    Elements.forEach(( e ) => {
        customElements.define( e.name, e.component )

        /**
         * init app elem
         */
        if( typeof e.app !== 'undefined' ) {
            let appElement = document.createElement( e.name )
            document.body.appendChild( appElement );
        }
    })
}

