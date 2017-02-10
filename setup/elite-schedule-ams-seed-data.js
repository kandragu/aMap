var request       = require('request'),
    q             = require('q'),
    leagueData    = require('./data-leagues.json'),
    gamesData     = require('./data-games.json'),
    teamsData     = require('./data-teams.json'),
    locationsData = require('./data-locations.json');

var url = 'https://elite-schedule-demo.azure-mobile.net/tables';

uploadData(url + '/locations', locationsData).then(function(){
	return uploadData(url + '/leagues', leagueData);
}).then(function(){
	return uploadData(url + '/teams', teamsData);
}).then(function(){
	return uploadData(url + '/games', gamesData);
});



function uploadData(url, data) {
    var promises = [];

    for (var i = 0; i < data.length; i++) {
        addRecord(data[i]);
    }


    function addRecord(itemToAdd) {
        var deferred = q.defer();
        promises.push(deferred.promise);

        var options = {
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'X-ZUMO-APPLICATION': 'GSECUHNQOOrCwgRHFFYLXWiViGnXNV88'
            },
            form: itemToAdd
        };

        request.post(options, function(error, response, body) {
            //console.log("Response: ", body);
            //console.log("Request Complete.");
            deferred.resolve();
        });
    }

    return q.all(promises);
}
