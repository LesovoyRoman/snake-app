'use strict';

export const measurement = 'px';
export const sizeElement = 4;
export const elementToGenerate = 'snake-element';

/**
 * Do not change it !!!
 *
 * @type {{right: string, left: string, top: string, bottom: string}}
 */
export const directions = {
    right: 'right',
    left: 'left',
    top: 'top',
    bottom: 'bottom'
}

/**
 * Snake settings
 *
 * ( Use direction only top \ left )
 *
 * @type {{speed: number, length: number, direction: string}}
 */
export const snake = {
    speed: 100,
    length: 65,
    headColor: '#31f628',
    direction: directions.top
}

/**
 * Sizes for app field
 *
 * @type {{width: number, height: number}}
 */
export const fieldSizes = {
    width: 400,
    height: 400
}

/**
 * Elements
 * @type {{common: {width: string, height: string, background: string}}}
 */
export const snakeElements = {
    common: {
        width: sizeElement + measurement,
        height: sizeElement + measurement,
        background: '#000',
        position: 'absolute',
    },
    attributes: {
        direction: snake.direction
    }
}

/**
 * Some styles for field
 * @type {{width: string, height: string, border: string, margin: string}}
 */
export const gameField = {
    width: fieldSizes.width + measurement,
    height: fieldSizes.height + measurement,
    border: 4 + measurement + ' solid black',
    margin: 25 + measurement + ' auto',
    position: 'relative',
    overflow: 'hidden'
}



