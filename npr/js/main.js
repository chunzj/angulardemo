var app = angular.module('myApp', []);

var apiKey = 'MDIwNTI1MDkxMDE0NDI1Njk1ODU4MGM4Mw001',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

//相当于main函数
app.run(function ($rootScope) {
  $rootScope.name = 'Root Ari Lerner';
});

app.controller('PlayerController', ['$scope', '$http', function ($scope, $http) {
  $scope.playing = false;
  $scope.audio = document.createElement('audio');
  $scope.audio.src = $scope.curMp3File || './media/npr.mp3';

  $scope.play = function(program) {
    if ($scope.playing) $scope.audio.pause();

    if (program) {
      var url = program.audio[0].format.mp4.$text;
      $scope.curMp3File = url;
      $scope.audio.src = url;
    }
    
    $scope.audio.play();

   $scope.playing = true;
  }

  $scope.stop = function () {
    $scope.audio.pause();
    $scope.playing = false;
  }

  $scope.audio.addEventListener('ended', function ($scope) {
    $scope.$apply(function () {
      $scope.stop();
    });
  });

  $scope.lookName = function () {
    return '123';
  }

  loadData($scope, $http);

  $scope.$emit('lalala', {name:'chunzj'});
}]);

app.controller('RelatedController', ['$scope', function ($scope) {
  $scope.on('lalala', function (data) {
    console.log('%%%%%%%%%%%%%%%%%', data);
  });
}]);

function loadData($scope, $http) {
  // construct our http request
  $http({
    method: 'JSONP',
    url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
  }).success(function(data, status) {
    $scope.programs = data.list.story;
  }).error(function(data, status) {
    console.log(arguments);
  });
}

app.directive('nprLink', function() {
  return {
    restrict: 'EA',
    require: ['^ngModel'],
    replace: true,
    scope: {
      ngModel: '=',
      play: '&'
    },
    templateUrl: './views/nprListItem.html',
    link: function(scope, ele, attr) {
      console.log(scope);
      scope.duration = scope.ngModel.audio[0].duration.$text;
      console.log(attr.width + ' = ' + attr.height);
    }
  }
});

app.directive('hello', function () {
  return {
    template: '<div>Hi there <span ng-transclude></span><span ng-transclude></span><span>haha</span></div>',
    transclude: true
  };
});

console.log($('#programs_list'));
