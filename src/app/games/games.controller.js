(function () {
    'use strict';

    angular.module('eliteAdmin').controller('GamesCtrl', GamesCtrl);

    GamesCtrl.$inject = ['$modal', '$location', '$stateParams', 'initialData', 'eliteApi', 'dialogsService'];

    /* @ngInject */
    function GamesCtrl($modal, $location, $stateParams, initialData, eliteApi, dialogs) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.deleteItem = deleteItem;
        vm.editItem = editItem;
        vm.games = initialData.games;
        vm.locations = initialData.locations;
        vm.locationsLookup = {};
        vm.teams = initialData.teams;
        vm.teamsLookup = {};

        activate();

        ////////////////

        function activate() {
            _.forEach(vm.teams, function(team){
                vm.teamsLookup[team.id] = team.name;
            });

            _.forEach(vm.locations, function(location){
                vm.locationsLookup[location.id] = location.name;
            });
        }

        function deleteItem(id){
            dialogs.confirm('Are you sure you want to Delete this item?', 'Delete?', ['OK', 'Cancel'])
                .then(function(){
                    eliteApi.deleteGame(id).then(function(data){
                        _.remove(vm.games, { 'id': id });
                    });
                });
        }

        function editItem(game){
            var modalInstance = $modal.open({
                templateUrl: '/app/games/edit-game.html',
                controller: 'EditGameCtrl',
                controllerAs: 'vm',
                resolve: {
                    data: function() {
                        return {
                            locations: _.sortBy(vm.locations, 'name'),
                            teams: _.sortBy(vm.teams, 'divisionName, name'),
                            itemToEdit: game
                        };
                    }
                }
            });

            modalInstance.result.then(function(result){
                result.leagueId = $stateParams.leagueId;
                eliteApi.saveGame(result).then(function(data){
                    if (game){
                        _.assign(game, data);
                    } else{
                        vm.games.push(data);
                    }
                });
            });
        }


    }
})();