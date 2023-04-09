(function () {
    'use strict';

    angular
        .module('va.business.invoices')
        .factory('InvoicesModel', InvoicesModel);

    /** @ngInject */
    function InvoicesModel(Endpoints, EndpointSettings, $resource) {
        var factory = {};

        factory.invoices = $resource(Endpoints.invoices, null, EndpointSettings.resource);

        return factory;

    }

})();
