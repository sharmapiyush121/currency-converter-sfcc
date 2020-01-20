'use strict';

/* global request */
var dwsvc = require('dw/svc');

/**
 * Creates a fixer.io API service to get currency Symbols
 * @return {dw.svc.service} returns a REST service
 */
var symbolsService = dwsvc.LocalServiceRegistry.createService("symbolsService", {
    createRequest: function (svc, args) {
        svc.setRequestMethod("GET");
        return null;
    },
    parseResponse: function (svc, response) {
        return {
            statusCode: response.statusCode,
            statusMessage: response.statusMessage,
            headers: response.responseHeaders,
            body: JSON.parse(response.text),
            originalResponse: response
        };
    }
});


/**
 * Creates a fixer.io API service to get currency conversion rates
 * @return {dw.svc.service} returns a REST service
 */
var conversionService = dwsvc.LocalServiceRegistry.createService("conversionService", {
    createRequest: function (svc, args) {
        svc.setRequestMethod("GET");
        return null;
    },
    parseResponse: function (svc, response) {
        return {
            statusCode: response.statusCode,
            statusMessage: response.statusMessage,
            headers: response.responseHeaders,
            body: JSON.parse(response.text),
            originalResponse: response
        };
    }
});

module.exports = {
    symbolsService: symbolsService,
    conversionService: conversionService
};
