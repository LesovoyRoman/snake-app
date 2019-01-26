'use strict';

import SnakeCommon from './../classes/SnakeCommon'
import { directions } from './../configGame'

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
            SnakeCommon.changeDirection( directions.left )
        }
    },
    {
        name: nameEvents.toLeft,
        handler: ( event ) => {
            SnakeCommon.changeDirection( directions.right )
        },
    },
    {
        name: nameEvents.toTop,
        handler: ( event ) => {
            SnakeCommon.changeDirection( directions.bottom )
        }
    },
    {
        name: nameEvents.toBottom,
        handler: ( event ) => {
            SnakeCommon.changeDirection( directions.top )
        }
    },
];