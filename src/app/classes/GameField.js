'use strict';

import template from './../components/GameField.html'
import { parseHtml, bindTemplate } from './../helpers/bundle'

export default class GameField extends HTMLElement {
    constructor() {
        super();

        bindTemplate( this, parseHtml( template ), "#field" )
    }
}
