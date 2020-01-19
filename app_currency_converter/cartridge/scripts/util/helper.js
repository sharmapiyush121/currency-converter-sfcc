'use strict';

var currencyServices = require('../services/currencyService');

/**
 * gets the currency symbols from fixer.io
 * @returns {object} Returns the object with currency symbols
 */
function getCurrencySymbols() {
    var symbolsArray = [];
    var symbolServiceResponse = currencyServices.symbolsService.call();
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
 * gets the currency symbols from fixer.io
 * @returns {object} Returns the object with currency symbols
 */
function getConversionValue() {
    var rates = null;
    var euroValue = new Number(request.httpParameterMap.euro.value);
    var symbol = request.httpParameterMap.symbol.value;

    var currencyConvertObj = getCurrencyConvertObj();
    if (currencyConvertObj !== null) {
        var Calendar = require('dw/util/Calendar');
        var lastModfied = currencyConvertObj.lastModified.getTime();
        var calendar = new Calendar();
        var nowTime = calendar.getTime().getTime();
        if ((nowTime - lastModfied) <= 900000) {
            var rates = JSON.parse(currencyConvertObj.custom.conversionValues);
        }
    }

    if (rates === null) {
        var conversionServiceResponse = currencyServices.conversionService.call();
        if (conversionServiceResponse.status === 'OK') {
            cacheValueToCustomObj(conversionServiceResponse.object.body.rates);
            //return conversionServiceResponse.object.body.rates[symbol] * euroValue;
            rates = conversionServiceResponse.object.body.rates;
        }
    }
    if(!empty(rates)){
        return rates[symbol] * euroValue;
    }
    return null;
}

/**
 * Cache the value for fixer.io API in custom Object
 * @returns {object} Returns the object with currency symbols
 */
function cacheValueToCustomObj(obj) {
    var Transaction = require('dw/system/Transaction');
    var currencyConvertObj = getCurrencyConvertObj();

    Transaction.wrap(function () {
        currencyConvertObj.custom.conversionValues = typeof obj !== 'String' ? JSON.stringify(obj) : obj;
    });
}

/**
 * Cache the value for fixer.io API in custom Object
 * @returns {object} Returns the object with currency symbols
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