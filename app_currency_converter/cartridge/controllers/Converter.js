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
 * Renders the Currency Converter page.
 */
function show() {
    var symbols = helper.getCurrencySymbols();
    app.getView({
        Symbols: symbols
    }).render('converter/currencyconverter');
}

/**
 * Renders the home page.
 */
function onChange() {
    var responseUtils = require('app_storefront_controllers/cartridge/scripts/util/Response');
    var value = helper.getConversionValue();
    responseUtils.renderJSON({
        success: value !== null ? true : false,
        value: value
    });
    return;
}

/*
 * Export the publicly available controller methods
 */
/** Renders the Currency Converter page.
 * @see module:controllers/Converter~show */
exports.Show = guard.ensure(['get'], show);
/** Hendles the onchange funcion.
* @see module:controllers/Converter~onChange */
exports.OnChange = guard.ensure(['get'], onChange);