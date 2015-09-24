/**
 * Created by ChunZuJun on 2015/9/23.
 *
 */
var bookListModule = angular.module('BookListModule', []);

bookListModule.controller('BookListCtrl', function ($scope, $http, $state, $stateParams) {
  $scope.filterOptions = {
    filterText: '',
    useExternalFilter: true
  };
  $scope.totalServerItems = 0;
  $scope.pagingOptions = {
    pageSizes: [5, 10, 20],
    pageSize: 5,
    currentPage: 1
  };
  $scope.setPagingData = function (data, page, pageSize) {
    var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
    $scope.books = pagedData;
    $scope.totalServerItems = data.length;
    if (!$scope.$$phase) {
      $scope.$apply();
    }
  };
  //������Ը���·���ϴ��ݹ�����bookType�������ز�ͬ������
  console.log($stateParams);
  $scope.getPagedDataAsync = function (pageSize, page, searchText) {
    setTimeout(function () {
      var data;
      if (searchText) {
        var ft = searchText.toLowerCase();
        $http.get('../data/books' + $stateParams.bookType + '.json').
          success(function(largeLoad) {
              data = largeLoad.filter(function (item) {
                return JSON.stringify(item).toLowerCase().indexOf(ft);
              });
              $scope.setPagingData(data, page, pageSize);
            });
      } else {
        $http.get('data/book' + $stateParams.bookType + '.json').
          success(function (largeLoad) {
                $scope.setPagingData(largeLoad, page, pageSize);
            });
      }
    }, 100);
  };
  $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
  $scope.$watch('pagingOptions', function (newVal, oldVal) {
    if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
      $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    }
  }, true);
  $scope.$watch('filterOptions', function (newVal, oldVal) {
    if (newVal !== oldVal) {
      $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    }
  }, true);
  $scope.gridOptions = {
    data: 'books',
    rowTemplate: '<div style="height: 100%"><div ng-style="{\'cursor\': row.cursor}" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell">' +
      '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ngVerticalBarVisible: !$last}"></div>' +
      '<div ng-cell></div>' +
    '</div></div>',
    multiSelect: false,
    enableCellSelection: true,
    enableRowSelection: false,
    enableCellEdit: true,
    enablePinning: true, //�����̶�
    columnsDefs: [{
      field: 'index',
      displayName: '���',
      width: 60,
      pinnable: false,
      sortable: false
    }, {
      field: 'name',
      displayName: '����',
      enableCellEdit: true
    }, {
      field: 'author',
      displayName: '����',
      enableCellEdit: true,
      width: 220
    }, {
      field: 'pubTime',
      displayName: '��������',
      enableCellEdit: true,
      width: 120
    }, {
      field: 'price',
      displayName: '����',
      enableCellEdit: true,
      width: 120,
      cellFilter: 'currency:"��"'
    }, {
      field: 'bookId',
      displayName: '����',
      enableCellEdit: false,
      sortable: false,
      pinnable: false,
      cellTemplate: '<div><a ui-sref="bookdetail({bookId: row.getProperty(col.field)})" id="{{row.getProperty(col.field)}}">����</a></div>'
    }],
    enablePaging: true,
    showFooter: true,
    totalServerItems: 'totalServerItems',
    pagingOptions: $scope.pagingOptions,
    filterOptions: $scope.filterOptions
  };
});

/**
 * �鼮����ģ��
 *
 * @type {module}
 */
var bookDetailModule = angular.module('BookDetailModule', []);
bookDetailModule.controller('BookDetailCtrl', function ($scope, $http, $state, $stateParams) {
  console.log($stateParams);
  //to do
});