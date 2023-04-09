(function () {
    'use strict';

    angular
        .module('va.business.invoices')
        .controller('InvoicesController', InvoicesController);

    /** @ngInject */
    function InvoicesController(InvoicesModel, $window) {
        var vm = this,
            invoices;

        invoices = InvoicesModel.invoices.query();

        /* ---------------------------------------- /*
            VIEW MODEL
        /* ---------------------------------------- */

        vm.invoices = invoices;
        vm.showOnboarder = showOnboarder;
        vm.showData = showData;
        vm.openInvoice = openInvoice;

        /* ---------------------------------------- /*
            PUBLIC
        /* ---------------------------------------- */

        function showOnboarder() {
            return invoices.$resolved && invoices.length < 1;
        }

        function showData() {
            return invoices.$resolved && invoices.length > 0;
        }

        function openInvoice() {
            $window.open('/invoice/1234');
        }
    }

})();
