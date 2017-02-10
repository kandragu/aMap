(function () {
    'use strict';

    angular.module('eliteAdmin').controller('HomeCtrl', HomeCtrl);

    /* @ngInject */
    function HomeCtrl($state,$http, $timeout, StreetView,NgMap) {
        /* jshint validthis: true */
        var vm = this;
        vm.stores = [];
        vm.notesCollapsed = true;
        vm.navigate = navigate;
        vm.activate = activate;
        vm.onStateClick = onStateClick;

        NgMap.getMap().then(function(evtMap) {
        console.log(evtMap.getCenter());
        /*console.log('markers', evtMap.markers);
        console.log('shapes', evtMap.shapes);*/
        //--
          var map = evtMap;
          map.fullscreenControl=false;
          vm.map = map;
          console.log('loading scripts/starbucks.json');
          $http.get('app/home/starbucks.js').then(function(resp) {
            /*debugger;*/
            console.log('stores', stores);
            var stores = resp.data;
            for (var i=0; i<stores.length; i++) {
              var store = stores[i];
              store.position = new google.maps.LatLng(store.latitude,store.longitude);
              store.title = store.name;
              var marker = new google.maps.Marker(store);
              vm.stores.push(marker);
            }
            console.log('finished loading scripts/starbucks.json', 'vm.stores', vm.stores.length);
            vm.markerClusterer = new MarkerClusterer(map, vm.stores, {});
          }, function(err) { console.log('err', err)});

        //--

        });

        activate();

        ////////////////

        function activate() {
            console.log('current state data', $state.current.data);
        }

       function onStateClick(event) {
            vm.geoType =  event.feature.getGeometry().getType();
            vm.geoArray = event.feature.getGeometry().getArray();
            console.log('geoArray', event.feature.getGeometry().getArray());
          }

        function navigate(){
            $state.go('leagues');
        }

    }
})();