'use strict';

/* global request */
var dwsvc = require('dw/svc');

/**
 * Creates a fixer.io API service to get currnecy Symbols
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

module.exports = {
    symbolsService: symbolsService
};