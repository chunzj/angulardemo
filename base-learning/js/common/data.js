/**
 * Created by chunzj on 2015/9/27.
 */
var dataPkg = angular.module('dataPkg', []);
dataPkg.service('data', function () {
  this.name = 'chunzj';
  this.getName = function () {
    return this.name;
  }
  this.setName = function (name) {
    this.name = name;
  }
});