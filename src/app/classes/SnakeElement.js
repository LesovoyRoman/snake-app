'use strict';

import { snakeElements } from "../configGame";

export default class SnakeElement extends HTMLElement {
    constructor() {
        super();

        this.setAttributes( snakeElements.common )
        return this
    }

    setAttribute(name, value) {
        this.style[name] = value;
    }

    setAttributes(attrs) {
        for(let attr in attrs) this.style[attr] = attrs[attr]
    }
}