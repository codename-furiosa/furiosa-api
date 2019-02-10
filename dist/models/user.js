"use strict";

var Archetype = require('archetype-js');

module.exports = new Archetype({
  address: {
    $type: 'string',
    $required: true
  },
  name: {
    $type: 'string',
    $required: true,
    $default: ''
  }
}).compile('UserType');