'use strict';

var currencyServices = require('../services/currencyService');

/**
 * gets the currency symbols from fixer.io
 * @function getCurrencySymbols
 * @returns {Array} Returns an array with currency symbols
 */
function getCurrencySymbols() {
    var symbolsArray = [];

    //Call the fixer.io service to get all the avaiable currencies
    var symbolServiceResponse = currencyServices.symbolsService.call();

    // If service is OK, then iterate through all the objects and add it to the symbols array,
    // else return an empty array.
    if (symbolServiceResponse.status === 'OK') {
        for (let key in symbolServiceResponse.object.body.symbols) {
            symbolsArray.push({
                'displayValue': symbolServiceResponse.object.body.symbols[key],
                'value': key
            });
        }
    }
    return symbolsArray;
}

/**
 * gets the conversion rate for all the currencies for a euro 
 * @function getConversionValue
 * @returns {Number} Returns converted value for a currency
 */
function getConversionValue() {
    var rates = null;

    // Euro value to be converted
    var euroValue = new Number(request.httpParameterMap.euro.value);

    // Currency to be converted to
    var symbol = request.httpParameterMap.symbol.value;

    // Get the currency custom object
    var currencyConvertObj = getCurrencyConvertObj();

    // If currencyConvertObj is not null, check when it was last updated.
    // if less than 15 minutes ago, then get the rates from custom object
    if (currencyConvertObj !== null) {
        var Calendar = require('dw/util/Calendar');

        // Get last modified time
        var lastModfied = currencyConvertObj.lastModified.getTime();

        // Get the currency date and time
        var calendar = new Calendar();
        var nowTime = calendar.getTime().getTime();

        // Compare now and last modified time and see if the difference is more than 
        // 900000 mili-seconds (15 Mins)
        if ((nowTime - lastModfied) <= 900000) {
            // If less than or equal to 15 minutes, get the currency rates from custom object
            var rates = JSON.parse(currencyConvertObj.custom.conversionValues);
        }
    }

    // If currency rates not avaiable in custom object or was stored more than 15 mins ago
    // Call the fixer.io service to refresh the currency rates
    if (rates === null) {
        // call the service
        var conversionServiceResponse = currencyServices.conversionService.call();

        // If status OK, store the rates in custom object
        if (conversionServiceResponse.status === 'OK') {
            cacheValueToCustomObj(conversionServiceResponse.object.body.rates);
            rates = conversionServiceResponse.object.body.rates;
        }
    }

    // If rates are aviable calculate the converted value from Euro to the desired currency,
    // else return null
    if (!empty(rates)) {
        return rates[symbol] * euroValue;
    }
    return null;
}

/**
 * Cache the value for fixer.io API in custom Object
 * @function cacheValueToCustomObj
 * @param {Object} obj the object that need to be stored in the custom object
 * @returns {null}
 */
function cacheValueToCustomObj(obj) {
    var Transaction = require('dw/system/Transaction');

    // Get the currency converter custom object
    var currencyConvertObj = getCurrencyConvertObj();

    // Store the value in the conversionValues attribute in custom object
    Transaction.wrap(function () {
        currencyConvertObj.custom.conversionValues = typeof obj !== 'String' ? JSON.stringify(obj) : obj;
    });
}

/**
 * Gets the custom object, if custom object not present create it.
 * @returns {dw.object.CustomObject} the currency converter custom object
 */
function getCurrencyConvertObj() {
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var currencyConvertObj = CustomObjectMgr.getCustomObject("currencyConvert", "default");
    if (currencyConvertObj === null) {
        var Transaction = require('dw/system/Transaction');
        Transaction.wrap(function () {
            currencyConvertObj = CustomObjectMgr.createCustomObject("currencyConvert", "default");
        });
    }
    return currencyConvertObj;
}

module.exports = {
    getCurrencySymbols: getCurrencySymbols,
    getConversionValue: getConversionValue
};