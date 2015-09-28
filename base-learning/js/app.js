/**
 * Created by ChunZuJun on 2015/9/25.
 *
 */
var myApp = angular.module('MyApp', ['dataPkg'], function () {
  return {
    debugInfoEnabled: true
  };
});
myApp.constant('sex', ['男','女']);

myApp.run(function ($rootScope) {
  $rootScope.copied = false;
});

myApp.controller('constantCtrl', function($scope, sex) {
  $scope.sex = sex;
});

myApp.controller('logCtrl', function($scope, $log) {
  try {
    1/0;
    $log.info('right');
  } catch (e) {
    $log.error(e);
  }
});

myApp.controller('invokeCtrl', function ($scope, data) {
  $scope.name = data.getName();
  $scope.executeFn = function (fn, args) {
    angular.identity(args);
  }

  $scope.age = $scope.executeFn(function (age) {
    return age;
  }, 27);

  console.log(angular.identity($scope.executeFn));

});

myApp.controller('ngBindTemplateCtrl', function ($scope) {
  $scope.name = 'chunzj';
  $scope.salutation = '123';
});

myApp.controller('ngModelOptionsCtrl', function ($scope) {
  var _name = 'chunzj';
  $scope.name = function (name) {
    if (name) {
      console.log('set name');
      _name = name;
    } else {
      console.log('get name');
    }
    return _name;
  }
});

myApp.controller('pluralizeCtrl', function ($scope) {
  $scope.person1 = 'Igor';
  $scope.person2 = 'Misko';
  $scope.person3 = 'Rick';
  $scope.personCount = 1;
});

myApp.controller('switchCtrl', function ($scope) {
  $scope.items = ['settings', 'home', 'other'];
  $scope.selection = $scope.items[0];
});