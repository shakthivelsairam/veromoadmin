(function() {
    'use strict';

    angular
        .module('va.helpfaq')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state('help-faq', {
                url: '/help-faq',
                templateUrl: 'app/help-faq/help-faq.html',
                controller: 'HelpFaqController',
                controllerAs: 'vm'
            })
        ;
    }

})();
