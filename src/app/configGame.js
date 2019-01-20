'use strict';

export const measurement = 'px';

/**
 * Elements
 * @type {{common: {width: string, height: string, background: string}}}
 */
export const snakeElements = {
    common: {
        width: 4 + measurement,
        height: 4 + measurement,
        background: '#000',
        position: 'absolute',
    },
}
export const elementToGenerate = 'snake-element';

/**
 * Sizes for app field
 * @type {{width: number, height: number}}
 */
export const fieldSizes = {
    width: 500,
    height: 300
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
    position: 'relative'
}

export const snake = {
    length: 5,
    directionVertically: false,
    settable: {
        position: 'absolute',
        left: 150 + measurement,
        top: 100 + measurement,
    }
}

