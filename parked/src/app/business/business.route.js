(function () {
    'use strict';

    angular
        .module('va.business')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state('business', {
                abstract: true,
                url: '/business',
                template: '<ui-view/>'
            })
        ;
    }

})();
