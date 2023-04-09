(function () {
    'use strict';

    angular
        .module('va.namefinder')
        .controller('NameFinderController', NameFinderController);

    /** @ngInject */
    function NameFinderController() {
        var vm = this;

        /* ---------------------------------------- /*
            VIEW MODEL
        /* ---------------------------------------- */

        vm.refreshSearch = refreshSearch;

        /* ---------------------------------------- /*
            PUBLIC
        /* ---------------------------------------- */

        /**
         * refreshSearch
         */
        function refreshSearch() {}

    }

})();
