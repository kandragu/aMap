(function () {
    'use strict';

    angular.module('eliteAdmin').controller('EditGameCtrl', EditGameCtrl);

    EditGameCtrl.$inject = ['$modalInstance', 'data'];

    /* @ngInject */
    function EditGameCtrl($modalInstance, data) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.cancel = cancel;
        vm.editableItem = angular.copy(data.itemToEdit);
        vm.gameDate = {};
        vm.gameTime = {};
        vm.open = openDatePicker;
        vm.opened = false;
        vm.properties = data;
        vm.save = save;
        vm.title = (data.itemToEdit ? 'Edit Game' : 'Add New Game');

        activate();

        ////////////////

        function activate() {
            if (data.itemToEdit) {
                vm.gameDate = data.itemToEdit.time;
                vm.gameTime = moment(data.itemToEdit.time).toDate();
            } else {
                vm.gameDate = moment().format('MM/DD/YYYY');
                vm.gameTime = moment('18:00', 'HH:mm').toDate();
            }
        }

        function cancel(){
            $modalInstance.dismiss();
        }

        function combine(date, time) {
            var dateString = moment(date).format('MM/DD/YYYY');
            return moment(dateString + ' ' + moment(time).format('HH:mm')).format('YYYY-MM-DDTHH:mm:00');
        }

        function openDatePicker($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.opened = true;
        }

        function save(){
            vm.editableItem.time = combine(vm.gameDate, vm.gameTime);
            $modalInstance.close(vm.editableItem);
        }
    }
})();