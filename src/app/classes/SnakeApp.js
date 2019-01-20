'use strict';

import template from './../App.html'
import { parseHtml, bindTemplate, singleton } from './../helpers/bundle'

export default class SnakeApp extends HTMLElement {
    constructor() {
        super();
        singleton( SnakeApp, this )

        bindTemplate( this, parseHtml( template ), "#App" )
    }

    /**
     * @returns {SnakeApp}
     */
    static getInstance() {
        return this;
    }
}
