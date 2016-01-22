var app = angular.module('onepage', ['firebase', 'ui.bootstrap']);

app.factory("PageDB", function($firebaseArray) {
    var fb = new Firebase('https://auth-item.firebaseio.com/pages');
    return $firebaseArray(fb);
});

app.filter('domain', function() {
    return function(input) {
        var matches, output = '',
            urls = /\w+:\/\/([\w|\.]+)/;
        matches = urls.exec(input);
        if (matches !== null) output = matches[1];
        return output;
    };
});

app.filter('logo', function() {
    return function(input) {
        var matches, output = '',
            urls = /\w+:\/\/([\w|\.]+)/;
        matches = urls.exec(input);
        if (matches !== null) output = 'https://www.google.com/s2/favicons?domain=' + matches[1];
        return output;
    };
});

app.controller('MainCtrl', ['$scope', '$filter', 'PageDB', function($scope, $filter, PageDB) {
    var date = $filter('date')(new Date(), 'yyyyMMddThhmmss');
    var fb = new Firebase('https://auth-item.firebaseio.com/pages');

    chrome.tabs.query({
        currentWindow: true
    }, function(tabs) {
        var list = [];
        for (var i = 0, tab = {}; tab = tabs[i]; i++) {
            list.push({
                'id': tab.id,
                'title': tab.title,
                'url': tab.url
            });
        }
        fb.push({
            'date': date,
            'tabs': list
        });
    });


    $scope.pages = PageDB;
    $scope.action = '';

    console.log($scope.pages);

    // var fb1 = new Firebase('https://auth-item.firebaseio.com/pages');
    // $scope.pages = fb1.child('20160121T074121');
    // fb1.on("value", function(snapshot) {
    //     $scope.pages = [];
    //     angular.forEach(snapshot.val(), function(val, key) {
    //         console.log(key, val);
    //         $scope.pages.push({
    //             'name': key,
    //             'tabs': val
    //         });
    //     });
    //     console.log($scope.pages);
    // }, function(errorObject) {
    //     console.log("The read failed: " + errorObject.code);
    // });

    $scope.eClick = function(tab) {
        if ($scope.action == 'delete') {
            console.log(tab);
        } else {
            window.location.href = tab.url;
        }
    };



}]);
