(function () {
    'use strict';

    angular
        .module('va.business.settings')
        .controller('BusinessSettingsController', BusinessSettingsController);

    /** @ngInject */
    function BusinessSettingsController(BusinessModel, $state, Toast) {
        var vm = this;
        var business = BusinessModel.business;

        // vm:
        vm.business = business.get();
        vm.updateBusiness = updateBusiness;
        vm.cancelUpdate = cancelUpdate;


        /**
         * PUBLIC
         */

        function updateBusiness(businessUpdated) {
            business.save(businessUpdated, updateSuccess, updateFail);
        }

        function cancelUpdate() {
            $state.go('business.settings');
        }


        /**
         * PRIVATE
         */

        function updateSuccess() {
            $state.go('business.settings');
        }

        function updateFail(response) {
            Toast.warning(response.status + ': ' + response.data);
        }

    }

})();
