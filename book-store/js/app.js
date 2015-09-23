/**
 * Created by ChunZuJun on 2015/9/23.
 *
 */
var routerApp = angular.module('routerApp', ['ui.router', 'ngGrid', 'BookListModule']);

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
      //��һ��ҳ���ϴ��ж��ui-view��ʱ��
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