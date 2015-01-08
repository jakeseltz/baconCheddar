angular.module('baconCheddar', ['ui.router'])
.config([
	$stateProvider,
	$urlRouterProvider,
	function($stateProvider, $urlRouterProdiver){
		$stateProvider
		.state('/profile',{
			url: '/home',
			templateUrl: '/profile.html',
			controller :'MainCtrl'
			
		})

		$urlRouterProdiver.otherwise('profile');
	}])


.factory('expenses',['$http', function($http){
	var o = {
		expenses : []
	};

	o.getAll = function(){
		return = $http.get('/expenses').success(function(data){
			angular.copy(data,o.expenses);
		});
	}

	o.create = function(expenses){
		return $http.post('/public', expense).success(function(data){
			o.expenses.push(data);
		})
	}
	return o ;
	])

.controller('MainCtrl',['$scope', 'expenses', function($scope,expenses){
	$scope.test = "hello world"

	$scope.expenses = expenses.expenses;


	$scope.addExpense = function(){
		if(!$scope.cost || !scope.desc){return;}

		expenses.create({
			cost: $scope.cost,
			desc: $scope.desc	
		});

		$scope.cost = '';
		$scope.desc = '';
	}



}])