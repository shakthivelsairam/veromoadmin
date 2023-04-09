(function () {
    'use strict';

    angular
        .module('va.business.orders')

        .controller('OrdersController', OrdersController);

    /** @ngInject */
    function OrdersController(OrdersModel, OnceCart, BusinessAccounts) {
        var vm = this,
            orders,
            i,
            j;

        /* ---------------------------------------- /*
            BOOTSTRAP
        /* ---------------------------------------- */
        orders = OrdersModel.orders.query(
            function() {
                for (i = 0; i < orders.length; i++)  {
                    for (j = 0; j < orders[i].items.length; j++)  {
                        if (orders[i].items[j].lineType == "subitem" && orders[i].items[j].product == "domain" && orders[i].items[j].description == "") {
                            orders[i].items.splice(j,1);
                        }
                        if (orders[i].items[j].lineType == "package" || orders[i].items[j].lineType == "subitem") {
                            orders[i].items[j].category = "Business Package";
                        }
                        else if (orders[i].items[j].lineType == "product") {
                            switch (orders[i].items[j].product) {
                                case "business":
                                    orders[i].items[j].category = "Business Name Registration";
                                    break;
                                case "domain":
                                    orders[i].items[j].category = "Domain Name Registration";
                                    break;
                                case "folder":
                                    orders[i].items[j].category = "Business Register";
                                    break;
                                default:
                                    orders[i].items[j].category = "Additions";
                            }
                        }
                        //OnceCart.setItemDescription(orders[i].items[j], true);
                        orders[i].items[j].price = parseFloat(orders[i].items[j].price);
                    }
                    orders[i].created = orders[i].created.substr(0,10);
                }
            }
        );

        /* ---------------------------------------- /*
            VIEW MODEL
        /* ---------------------------------------- */

        vm.orders = orders;
        vm.showOnboarder = showOnboarder;
        vm.showData = showData;
        vm.showOrderDetailToggle = showOrderDetailToggle;
        vm.getFirstLetter = getFirstLetter;
         vm.currentAccount = BusinessAccounts.getCurrentAccount();


        /* ---------------------------------------- /*
            PUBLIC
        /* ---------------------------------------- */

        function showOnboarder() {
            return orders.$resolved && orders.length < 1;
        }

        function showData() {
            return orders.$resolved && orders.length > 0;
        }

        function showOrderDetailToggle(i) {
            return orders[i].show_detail = !orders[i].show_detail;
        }

        function getFirstLetter(name) {
            return name ? name.substr(0, 1) : null;
        }
    }

})();
