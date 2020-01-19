'use strict';

/**
 * Controller that renders the Currency Converter page.
 *
 * @module controllers/Converter
 */

var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');

/**
 * Renders the home page.
 */
function show() {
    app.getView().render('converter/currencyconverter');
}

/*
 * Export the publicly available controller methods
 */
/** Renders the home page.
 * @see module:controllers/Converter~show */
 exports.Show = guard.ensure(['get'], show);