var should = require('should');
var messages = require('./socketMessages');

describe('Socket Messages', function() {
    describe('Server', function () {
       it('should be named "le servo"', function() {
           messages.server.name.should.equal('le servo');
       }); 
    });
});