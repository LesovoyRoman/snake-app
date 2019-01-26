'use strict';

import SnakeCommon from './../classes/SnakeCommon'
import { directions } from './../configGame'
import SnakeApp from "../classes/SnakeApp";

export const nameEvents = {
    toRight: 'toRight',
    toLeft: 'toLeft',
    toTop: 'toTop',
    toBottom: 'toBottom',
    space: 'space'
}

export const events = [
    /**
     * App events
     */
    {
        name: nameEvents.toRight,
        handler: ( event ) => {
            SnakeCommon.changeDirection( directions.right )
        }
    },
    {
        name: nameEvents.toLeft,
        handler: ( event ) => {
            SnakeCommon.changeDirection( directions.left )
        },
    },
    {
        name: nameEvents.toTop,
        handler: ( event ) => {
            SnakeCommon.changeDirection( directions.top )
        }
    },
    {
        name: nameEvents.toBottom,
        handler: ( event ) => {
            SnakeCommon.changeDirection( directions.bottom )
        }
    },
    {
        name: nameEvents.space,
        handler: ( event ) => {
            SnakeApp.pauseGame();
        }
    }
];