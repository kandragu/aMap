(function () {
    'use strict';

    angular.module('eliteAdmin').factory('gamesInitialDataService', gamesInitialDataService);

    gamesInitialDataService.$inject = ['$q', 'eliteApi'];

    /* @ngInject */
    function gamesInitialDataService($q, eliteApi) {
        var service = {
            getData: getData
        };

        return service;

        ////////////////

        function getData(leagueId) {

            return $q.all([
                eliteApi.getTeams(leagueId),
                eliteApi.getGames(leagueId),
                eliteApi.getLocations()
            ]).then(function(results){
                return {
                    teams: results[0],
                    games: results[1],
                    locations: results[2]
                };
            });
        }
    }
})();