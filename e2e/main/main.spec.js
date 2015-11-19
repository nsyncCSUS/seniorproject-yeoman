'use strict';

var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-as-promised'));

describe('Main View', function() {
    var page;

    beforeEach(function() {
      browser.get('/');
      page = require('./main.po');
    });
});
