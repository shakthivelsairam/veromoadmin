'use strict';

describe('Service: BusinessModel', function() {
    var BusinessModel;

    beforeEach(module('va.business'));
    beforeEach(module('va.mock.translation'));
    
    beforeEach(inject(function($injector) {
        BusinessModel = $injector.get('BusinessModel');
    }));

    it('should have a business property', function() {
        expect( BusinessModel.business ).toBeFunction();
    });
});
