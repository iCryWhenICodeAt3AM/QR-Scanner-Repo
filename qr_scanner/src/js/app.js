var myApp = angular.module('gdscApp', ['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/scanner', {
            templateUrl: 'views/scanner.html'
        })
        .when('/sheets', {
            templateUrl: 'views/createsheet.html'
        })
        .otherwise({
            templateUrl: 'views/error404.html'
        });
}]);

myApp.controller('QRCodeScannerController', function ($scope, $rootScope, $location) {
    // Listen for route changes
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        if (current && current.$$route && current.$$route.templateUrl === 'views/scanner.html') {
            // This route corresponds to the 'scanner' view
            initInstascan();
        }
    });

    function initInstascan() {
        const video = document.getElementById('camera');
        const resultElement = document.getElementById('result');
        const scanner = new Instascan.Scanner({ video });

        // Add a listener for when a QR code is scanned
        scanner.addListener('scan', function (content) {
            resultElement.textContent = content;
        });

        // Get the available cameras and start scanning with the first camera
        Instascan.Camera.getCameras()
            .then(function (cameras) {
                if (cameras.length > 0) {
                    scanner.start(cameras[0]);
                } else {
                    resultElement.textContent = 'No cameras found.';
                }
            })
            .catch(function (error) {
                console.error('Error accessing cameras: ' + error);
            });
    }
});
