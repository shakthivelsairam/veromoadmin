(function () {
    'use strict';

    angular
        .module('va.business.details')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state('business.details', {
                url: '/details',
                templateUrl: 'app/business/details/details.html',
                controller: 'BusinessDetailsController',
                controllerAs: 'vm'
            })
        ;
    }

})();
