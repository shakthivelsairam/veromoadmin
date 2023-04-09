(function () {
    'use strict';

    angular
        .module('va.business.settings')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state('business.settings', {
                url: '/settings',
                templateUrl: 'app/business/settings/settings.html',
                controller: 'BusinessSettingsController',
                controllerAs: 'vm'
            })
            .state('business.settings.edit', {
                url: '/edit',
                templateUrl: 'app/business/settings/settings.html',
                controller: 'BusinessSettingsController',
                controllerAs: 'vm'
            })
        ;
    }

})();
