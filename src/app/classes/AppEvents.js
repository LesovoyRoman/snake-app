'use strict';

import { events } from './../events/events'
import { singleton } from "../helpers/bundle";
import { handleKeyDown } from "../events/handler";

export default class AppEvents {
    constructor() {
        singleton( AppEvents, this )
        AppEvents.initEvents( events )

        /**
         * init ui keydown
         *
         * @param event
         */
        document.onkeydown = ( event ) => handleKeyDown( event )
    }

    static initEvents( events ) {
        events.forEach( event => {
            let newEvent = new CustomEvent( event.name );
            newEvent.initEvent( event.name, true, true );
            document.addEventListener( event.name, event.handler, true )
        })
    }

    static getEvents() {
        return events;
    }

    static destroyEvents( events ) {
        events.forEach( event => {
            document.removeEventListener( event.name, event.handler, true )
        })
    }

    static destroyEvent() {

    }
}
