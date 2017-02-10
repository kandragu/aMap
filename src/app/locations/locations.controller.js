(function () {
    'use strict';

    angular.module('eliteAdmin').controller('LocationsCtrl', LocationsCtrl);

    LocationsCtrl.$inject = ['initialData', 'dialogsService', 'eliteApi'];

    /* @ngInject */
    function LocationsCtrl(initialData, dialogs, eliteApi) {
        /* jshint validthis: true */
        debugger;
        var vm = this;

        vm.activate = activate;
        vm.deleteItem = deleteItem;
        vm.locations = initialData;

        activate();

        ////////////////

        function activate() {
        }

        function deleteItem(id) {
            dialogs.confirm('Are you sure you want to Delete this item?', 'Delete?', ['OK', 'Cancel'])
                .then(function(){
                    eliteApi.deleteLocation(id).then(function(data){
                        _.remove(vm.locations, { 'id': id });
                    });
                });
        }
    }
})();