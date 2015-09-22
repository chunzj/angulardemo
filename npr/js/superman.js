/**
 * Created by chunzj on 2015/9/22.
 */
var superman = angular.module('supermanApp', []);

superman.directive('superman', function () {
  return {
    restrict: 'AE',
    scope: {},
    controller: function ($scope) {
      $scope.abilities = [];
      //this指当前的指令暴露给外部的API集合对象
      this.addStrength = function () {
        $scope.abilities.push('strength');
      };
      this.addSpeed = function () {
        $scope.abilities.push('speed');
      };
      this.addLight = function () {
        $scope.abilities.push('light');
      }
    },
    link: function (scope, element, attrs) {
      element.addClass('btn btn-primary');
      element.bind('mouseenter', function () {
        console.log(scope.abilities);
      });
    }
  };
});

superman.directive('strength', function () {
  return {
    require: '^superman',
    link: function (scope, element, attrs, supermanCtrl) {
      supermanCtrl.addStrength();
    }
  };
});

superman.directive('speed', function () {
  return {
    require: '^superman',
    link: function (scope, element, attrs, supermanCtrl) {
      supermanCtrl.addSpeed();
    }
  };
});

superman.directive('light', function () {
  return {
    require: '^superman',
    link: function (scope, element, attrs, supermanCtrl) {
      supermanCtrl.addLight();
    }
  };
});