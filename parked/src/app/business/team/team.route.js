(function () {
    'use strict';

    angular
        .module('va.business.team')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state('business.team', {
                url: '/team',
                templateUrl: 'app/business/team/team.html',
                controller: 'TeamController',
                controllerAs: 'vm'
            })
        ;
    }

})();
