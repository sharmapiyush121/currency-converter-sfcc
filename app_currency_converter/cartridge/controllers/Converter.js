'use strict';

/**
 * Controller that renders the Currency Converter page.
 *
 * @module controllers/Converter
 */

var app = require('app_storefront_controllers/cartridge/scripts/app');
var guard = require('app_storefront_controllers/cartridge/scripts/guard');
var helper = require('~/cartridge/scripts/util/helper')
/**
 * Renders the home page.
 */
function show() {
    var symbols = helper.getCurrencySymbols();
    app.getView({
        Symbols : symbols
    }).render('converter/currencyconverter');
}

/*
 * Export the publicly available controller methods
 */
/** Renders the home page.
 * @see module:controllers/Converter~show */
 exports.Show = guard.ensure(['get'], show);