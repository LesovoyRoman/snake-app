'use strict';

import { defineElements } from './app/App.js'

import SnakeApp from './app/classes/SnakeApp';
import GameField from './app/classes/GameField'
import SnakeElement from './app/classes/SnakeElement'
import SnakeCommon from './app/classes/SnakeCommon'
import AppEvents from './app/classes/AppEvents'

import { elementToGenerate } from "./app/configGame";

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
    {
        name: elementToGenerate,
        component: SnakeElement
    },
    {
        name: 'snake-common',
        component: SnakeCommon
    }
]

defineElements( Elements )
new AppEvents();