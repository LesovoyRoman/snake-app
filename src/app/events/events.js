'use strict';

import SnakeCommon from './../classes/SnakeCommon'

export const nameEvents = {
    toRight: 'toRight',
    toLeft: 'toLeft',
    toTop: 'toTop',
    toBottom: 'toBottom',
}

export const events = [
    /**
     * App events
     */
    {
        name: nameEvents.toRight,
        handler: ( event ) => {
            SnakeCommon.changeDirection( 'left' )
        }
    },
    {
        name: nameEvents.toLeft,
        handler: ( event ) => {
            SnakeCommon.changeDirection( 'right' )
        },
    },
    {
        name: nameEvents.toTop,
        handler: ( event ) => {
            SnakeCommon.changeDirection( 'bottom' )
        }
    },
    {
        name: nameEvents.toBottom,
        handler: ( event ) => {
            SnakeCommon.changeDirection( 'top' )
        }
    },
];