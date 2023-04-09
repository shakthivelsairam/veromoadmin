(function () {
    'use strict';

    angular
        .module('va.namefinder')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state('name-finder', {
                url: '/name-finder',
                templateUrl: 'app/name-finder/name-finder.html',
                controller: 'NameFinderController',
                controllerAs: 'vm'
            })
        ;
    }

})();
