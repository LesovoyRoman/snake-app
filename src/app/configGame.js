'use strict';

export const measurement = 'px';
export const sizeElement = 4;
export const elementToGenerate = 'snake-element';
export const snakeDirections = [ 'right', 'left', 'bottom', 'top' ];

/**
 * Sizes for app field
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

/**
 * Snake settings
 *
 * @type {{speed: number, length: number, direction: string}}
 */
export const snake = {
    speed: 500,
    length: 5,
    direction: snakeDirections[1]
}



