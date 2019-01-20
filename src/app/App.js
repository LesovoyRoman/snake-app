'use strict';

import SnakeApp from './classes/SnakeApp';
import GameField from './classes/GameField'

export function buildApp( app, parts ) {
    /**
     * here goes another parts of app
     * @type {GameField}
     */
    return parts.forEach(( e ) => app.appendChild( e ))
}

export function defineApp() {
    customElements.define ( "snake-app", SnakeApp )
    let appElement = document.createElement( "snake-app" )

    customElements.define( "snake-app-field", GameField )

    return document.body.appendChild( appElement );
}