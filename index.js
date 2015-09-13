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
  _ = require('lodash'),
  keyStrategy = require('./lib/KeyStrategy');

function CanvaraAuth(opts) {
  if(!opts || !opts.jwtSecret) {
    throw new Error('Jwt secret is required');
  }
  this.options = opts;
}

CanvaraAuth.strategy = {
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
  _.extend(config, this.options);
  if(config.strategy === CanvaraAuth.strategy.token) {
    return tokenStrategy(config);
  } else if(config.strategy === CanvaraAuth.strategy.apiKey) {
    return keyStrategy(config);
  } else {
    throw new Error('Unsupported authentication strategy');
  }
};

// export the constructor
module.exports = CanvaraAuth;