(function () {
    'use strict';

    angular
        .module('va.business')
        .factory('BusinessModel', BusinessModel);

    /** @ngInject */
    function BusinessModel(Endpoints, EndpointSettings, $resource) {
        var factory = {};

        factory.business = $resource(Endpoints.business, null, EndpointSettings.resource);

        return factory;

    }

})();
