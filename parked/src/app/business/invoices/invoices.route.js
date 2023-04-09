 (function () {
    'use strict';

    angular
        .module('va.business.invoices')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state('business.invoices', {
                url: '/invoices',
                templateUrl: 'app/business/invoices/invoices.html',
                controller: 'InvoicesController',
                controllerAs: 'vm'
            })
        ;
    }

})();
