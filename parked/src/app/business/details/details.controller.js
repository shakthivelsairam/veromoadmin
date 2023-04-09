(function () {
    'use strict';

    angular
        .module('va.business.details')
        .controller('BusinessDetailsController', BusinessDetailsController);

    /** @ngInject */
    function BusinessDetailsController(BusinessModel, $state) {
        var vm = this;
        var business = BusinessModel.business;

        vm.business = business.get();
        vm.goToDocumentation = goToDocumentation;


        /**
         * PUBLIC:
         */
        function goToDocumentation() {
            $state.go('documents');
        }

    }

})();
