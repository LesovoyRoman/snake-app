'use strict';

export default class SnakeElement extends HTMLElement {
    constructor() {
        super();

        return this
    }

    setAttribute(name, value) {
        this.style[name] = value;
    }
}