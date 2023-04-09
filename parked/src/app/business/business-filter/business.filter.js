(function () {
    'use strict';

    angular
        .module('va.business.orders')

        .filter('groupByCategory', function () {
            return function (orderline) {
                var category = [];
                angular.forEach(orderline, function (item) {
                    if (category.indexOf(item.category) == -1) {
                        category.push(item.category);
                    }
                });
                return category;
            }
        });

})();
