/**
 * Created by ChunZuJun on 2015/9/23.
 *
 */
var bookListModule = angular.module('BookListModule', []);

bookListModule.controller('BookListCtrl', function ($scope, $http, $state, $stateParams) {
  $scope.filterOptions = {
    filterText: '44',
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
  console.log($stateParams);
  $scope.getPagedDataAsync = function (pageSize, page, searchText) {
    setTimeout(function () {
      var data;
      if (searchText) {
        var ft = searchText.toLowerCase();
        $http.get('data/book' + $stateParams.bookType + '.json').
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
    if (newVal !== oldVal && (newVal.currentPage !== oldVal.currentPage ||
      newVal.pageSize !== oldVal.pageSize)) {
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
    enablePinning: true,
    columnsDefs: [{
      field: 'index',
      displayName: '序号',
      width: 60,
      pinnable: false,
      sortable: false
    }, {
      field: 'name',
      displayName: '书名',
      enableCellEdit: true
    }, {
      field: 'author',
      displayName: '作者',
      enableCellEdit: true,
      width: 220
    }, {
      field: 'pubTime',
      displayName: '出版日期',
      enableCellEdit: true,
      width: 120
    }, {
      field: 'price',
      displayName: '价格',
      enableCellEdit: true,
      width: 120,
      cellFilter: 'currency:"￥"'
    }, {
      field: 'bookId',
      displayName: '操作',
      enableCellEdit: false,
      sortable: false,
      pinnable: false,
      cellTemplate: '<div><a ui-sref="bookdetail({bookId: row.getProperty(col.field)})" id="{{row.getProperty(col.field)}}">详情</a></div>'
    }],
    enablePaging: true,
    showFooter: true,
    showFilter: true,
    totalServerItems: 'totalServerItems',
    pagingOptions: $scope.pagingOptions,
    filterOptions: $scope.filterOptions
  };
});

/**
 *
 * @type {module}
 */
var bookDetailModule = angular.module('BookDetailModule', []);
bookDetailModule.controller('BookDetailCtrl', function ($scope, $http, $state, $stateParams) {
  console.log($stateParams);
  //to do
});