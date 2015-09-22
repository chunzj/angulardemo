/**
 * Created by chunzj on 2015/9/22.
 */
var app = angular.module('directiveApp', []);

app.controller('directiveCtrl', function ($scope) {
  $scope.names = [{name:'chunzj'},{name:'huanglq'}];
  $scope.print = function () {
    console.log($scope.names);
  };
});

app.directive('hello', function () {
  return {
    restrict: 'AE',
    scope: {
      names: '=ngModel',
      sex: '@sex123',
      print: '&print123'
    },
    templateUrl: './tpl/list.html',
    replace: true
  };
});