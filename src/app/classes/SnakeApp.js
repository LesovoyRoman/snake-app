'use strict';

import template from './../App.html'
import { parseHtml, bindTemplate } from './../helpers/bundle'

export default class SnakeApp extends HTMLElement {
    constructor() {
        if ( SnakeApp.singleton ) {
            return SnakeApp.singleton
        }

        super();

        bindTemplate(this, parseHtml(template), "#App")

        SnakeApp.singleton = this
    }
}
