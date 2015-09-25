/**
 * Created by ChunZuJun on 2015/9/25.
 *
 */
var myApp = angular.module('MyApp', []);
myApp.constant('sex', ['男','女']);

myApp.controller('myCtrl', function($scope, sex) {
  $scope.sex = sex;
});