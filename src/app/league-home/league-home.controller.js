(function () {
    'use strict';

    angular.module('eliteAdmin').controller('LeagueHomeCtrl', LeagueHomeCtrl);

    LeagueHomeCtrl.$inject = ['initialData'];

    /* @ngInject */
    function LeagueHomeCtrl(initialData) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;

        activate();

        ////////////////

        function activate() {
        }


    }
})();