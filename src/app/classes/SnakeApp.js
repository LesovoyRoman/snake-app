'use strict';

import template from './../App.html'
import { parseHtml, bindTemplate, singleton } from './../helpers/bundle'
import SnakeCommon from './SnakeCommon'
import { snake } from "../configGame";

export default class SnakeApp extends HTMLElement {
    constructor() {
        super();
        singleton( SnakeApp, this )

        bindTemplate( this, parseHtml( template ), "#App" )

        SnakeApp.paused = false;

        SnakeApp.countedSteps = 0;

        SnakeApp.ended = false;

        SnakeApp.callGame();
    }

    /**
     * @returns {SnakeApp}
     */
    static getInstance() {
        return this;
    }

    static pauseGame() {
        return SnakeApp.paused = !SnakeApp.paused;
    }

    static endGame() {
        SnakeApp.ended = true;
    }

    static callGame() {
        return SnakeApp.startGame();
    }

    static startGame() {
        let gameTimer = setTimeout(function moment() {

            /**
             * Game process timer
             * @type {number}
             */
            if(!SnakeApp.paused) {
                SnakeApp.countedSteps++;
                SnakeCommon.moveSnake(SnakeApp.countedSteps);
            }

            if(!SnakeApp.ended) gameTimer = setTimeout(moment, snake.speed);
        }, snake.speed);
    }
}
