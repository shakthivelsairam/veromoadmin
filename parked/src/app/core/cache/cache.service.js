(function () {
    'use strict';

    angular
        .module('va.core')
        .factory('Cache', Cache);

    /** @ngInject */
    function Cache(Endpoints, $cacheFactory) {
        var factory = {},
            httpCache;

        httpCache = $cacheFactory.get('$http');


        /* ---------------------------------------- /*
            FACTORY
        /* ---------------------------------------- */

        factory.get = get;
        factory.remove = remove;

        return factory;


        /* ---------------------------------------- /*
            PUBLIC
        /* ---------------------------------------- */

        function get(endpoint) {
            return httpCache.get(Endpoints[endpoint]);
        }

        function remove(endpoint) {
            return httpCache.remove(Endpoints[endpoint]);
        }
    }

})();
