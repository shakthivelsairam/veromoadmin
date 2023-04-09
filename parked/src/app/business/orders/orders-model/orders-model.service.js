(function () {
    'use strict';

    angular
        .module('va.business.orders')
        .factory('OrdersModel', OrdersModel);

    /** @ngInject */
    function OrdersModel(Endpoints, EndpointSettings, $resource) {
        var factory = {};

        factory.orders = $resource(Endpoints.orders, null, EndpointSettings.resource);

        return factory;

    }

})();
