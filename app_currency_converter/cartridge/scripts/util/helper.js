'use strict';

var currencyServices = require('../services/currencyService');

/**
 * gets the currency symbols from fixer.io
 * @returns {object} Returns the object with currency symbols
 */
function getCurrencySymbols() {
    var symbolsArray = [];
    // var symbolServiceResponse = currencyServices.symbolsService.call();
    // if(symbolServiceResponse.status === 'OK'){
    //     for (let key in symbolServiceResponse.object.body.symbols) {
    //         symbolsArray.push({
    //             'displayValue' : symbolServiceResponse.object.body.symbols[key],
    //             'value' : key
    //         });
    //     }
    // }
    return symbolsArray;
}

module.exports = {
    getCurrencySymbols: getCurrencySymbols
};