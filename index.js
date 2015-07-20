/**
 * Copyright(c) 2015, canvara Technologies Pvt. Ltd.
 */
'use strict';

/**
 * Main file for the module
 * @author      ritesh
 * @version     1.0.0
 */

/**
 * Module dependencies
 * @private
 */
var tokenStrategy = require('./lib/TokenStrategy'),
  keyStrategy = require('./lib/KeyStrategy');

function CanvaraAuth(opts) {
  this.options = opts || {};
}

CanvaraAuth.prototype.strategy = {
  token: 'token',
  apiKey: 'apiKey'
};

/**
 * Process function
 * This will read the config object and return middleware function,
 * the middleware function is added to each route to perform authentication and authorization
 *
 * @param   {Object}    req             config object
 */
CanvaraAuth.prototype.process = function(config) {
  if(config.strategy === this.strategy.token) {
    return tokenStrategy(config);
  } else if(config.strategy === this.strategy.apiKey) {
    return keyStrategy(config);
  } else {
    throw new Error('Unsupported authentication strategy');
  }
};

// export the constructor
module.exports = CanvaraAuth;