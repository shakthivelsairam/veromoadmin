(function () {
    'use strict';

    angular
        .module('va.business.orders')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state('business.orders', {
                url: '/orders',
                templateUrl: 'app/business/orders/orders.html',
                controller: 'OrdersController',
                controllerAs: 'vm'
            })
        ;
    }

})();
