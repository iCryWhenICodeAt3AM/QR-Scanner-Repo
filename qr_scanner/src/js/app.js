var myApp = angular.module('gdscApp', ['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/scanner', {
            templateUrl: 'views/scanner.html'
        })
        .when('/sheets', {
            templateUrl: 'views/createsheet.html',
            controller: 'QRCodeScannerController'
        })
        .otherwise({
            templateUrl: 'views/error404.html'
        });
}]);

myApp.controller('QRCodeScannerController', function () {
    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
      scanner.addListener('scan', function (content) {
        console.log(content);
      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e); //no errors found
      });
});
