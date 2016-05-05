var app = angular.module('Vidzy', ['ngResource', 'ngRoute']);
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
        })
		.when('/add-video', {
            templateUrl: 'partials/video-form.html',
			controller: 'AddVideoCtrl'
        })
		 .when('/video/:id', {
        templateUrl: 'partials/video-form.html',
		controller: 'EditVideoCtrl'
		})
        .otherwise({
            redirectTo: '/'
        });
}]);



app.service('VideosService', ['$resource', 
    function($resource){
        var videosSvc = $resource('/api/videos');
        var videos;

       
/*       
       $scope.regions = Regions.query();
$scope.regions.$promise.then(function (result) {
    $scope.regions = result;
    
  */
    
       videos = videosSvc.query();
       videos.$promise.then(function(result) { console.log(result); videos = result;} );
        
        //videosSvc.query(function(data){ videos= data;
         //   console.log(videos)});
        
        /*
        videosSvc.query(function(data){
           data.then(function(result) { videos= result;} );
        } );
        
        */
      
        this.getVids = function() { return videos;}
        //return this;
//        Videos.query(function(videos){
//            $scope.videos = videos;
//        });
    }]);


app.controller('HomeCtrl', ['$scope', '$resource' ,'VideosService', 
    function($scope, $resource, VideosService){
        $scope.videos = VideosService.getVids();        
    }]);

	
/*	
    app.controller('HomeCtrl', ['$scope', '$resource', 
    function($scope, $resource){
        var Videos = $resource('/api/videos');
        Videos.query(function(videos){
            $scope.videos = videos;
        });
    }])
 */ 
    
	app.controller('AddVideoCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.save = function(){
            var Videos = $resource('/api/videos');
            Videos.save($scope.video, function(){
                $location.path('/');
            });
        };
		$scope.back = function(){$location.path('/');};
    }])
	
	
	app.controller('EditVideoCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){	
        var Videos = $resource('/api/videos/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });

        Videos.get({ id: $routeParams.id }, function(video){
            $scope.video = video;
        });

        $scope.save = function(){
            Videos.update($scope.video, function(){
                $location.path('/');
            });
        }
		$scope.back = function(){$location.path('/');};
    }]);