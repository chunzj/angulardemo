/**
 * Created by ChunZuJun on 2015/9/25.
 *
 */
var myApp = angular.module('MyApp', ['dataPkg']);
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
});

myApp.controller('ngBindTemplateCtrl', function ($scope) {
  $scope.name = 'chunzj';
  $scope.salutation = '123';

});