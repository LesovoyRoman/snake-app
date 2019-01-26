'use strict';

import { nameEvents } from "./events";

/**
 * Dispatch app events
 *
 * @param event
 */
export function handleKeyDown( event ) {
    let e = event || window.event;

    /**
     * Managing of snake's direction
     */
    switch (e.keyCode) {
        case 38:
            document.dispatchEvent( new Event( nameEvents.toTop ) );
            break;
        case 40:
            document.dispatchEvent( new Event( nameEvents.toBottom ) );
            break;
        case 37:
            document.dispatchEvent( new Event( nameEvents.toLeft ) );
            break;
        case 39:
            document.dispatchEvent( new Event( nameEvents.toRight ) );
            break;
        case 32:
            document.dispatchEvent( new Event( nameEvents.space ) );
            break;
    }
}