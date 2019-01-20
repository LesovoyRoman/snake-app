'use strict';

import { defineElements } from './app/App.js'

import SnakeApp from './app/classes/SnakeApp';
import GameField from './app/classes/GameField'

const Elements = [
    {
        name: 'snake-app',
        component: SnakeApp,
        app: true
    },
    {
        name: 'snake-app-field',
        component: GameField,
    },
]

defineElements( Elements )