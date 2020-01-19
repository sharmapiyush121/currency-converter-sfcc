'use strict';

var currencyServices = require('../services/currencyService');

/**
 * gets the currency symbols from fixer.io
 * @returns {object} Returns the object with currency symbols
 */
function getCurrencySymbols() {
    var symbolsArray = [];
    var symbolServiceResponse = currencyServices.symbolsService.call();
    if(symbolServiceResponse.status === 'OK'){
        for (let key in symbolServiceResponse.object.body.symbols) {
            symbolsArray.push({
                'displayValue' : symbolServiceResponse.object.body.symbols[key],
                'value' : key
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
    var conversionServiceResponse = currencyServices.conversionService.call();
    cacheValueToCustomObj()
    if(conversionServiceResponse.status === 'OK'){
        var euroValue = new Number(request.httpParameterMap.euro.value);
        var symbol = request.httpParameterMap.symbol.value;
        return conversionServiceResponse.object.body.rates[symbol] * euroValue;
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

    Transaction.wrap(function(){
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
        Transaction.wrap(function(){
            currencyConvertObj = CustomObjectMgr.createCustomObject("currencyConvert", "default");
        });
    }
    return currencyConvertObj;
}

module.exports = {
    getCurrencySymbols: getCurrencySymbols,
    getConversionValue : getConversionValue
};