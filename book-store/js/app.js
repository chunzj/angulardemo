/**
 * Created by ChunZuJun on 2015/9/23.
 *
 */
var routerApp = angular.module('routerApp', ['ui.router', 'ngGrid', 'BookListModule', 'BookDetailModule']);

routerApp.run(function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
});

routerApp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/index');
  $stateProvider.state('index', {
    url: '/index',
    views: {
      '': {
        templateUrl: 'tpls/home.html'
      },
      'main@index': {
        templateUrl: 'tpls/loginForm.html'
      }
    }
  }).state('booklist', {
    url: '/{bookType: [0-9]{1,4}}',
    views: {
      //当一个页面上带有多个ui-view的时候
      '': {
        templateUrl: 'tpls/bookList.html'
      },
      'booktype@booklist': {
        templateUrl: 'tpls/bookType.html'
      },
      'bookgrid@booklist': {
        templateUrl: 'tpls/bookGrid.html'
      }
    }
  });
});
