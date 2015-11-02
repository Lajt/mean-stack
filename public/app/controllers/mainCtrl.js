angular.module('mainCtrl', [])
	.controller('mainController', function($rootScope, $location, Auth){
		var vm = this;
		vm.loggedIn = Auth.isLoggedIn();
		$rootScope.$on('$routeChangeStart', function(){
			vm.loggedIn = Auth.isLoggedIn();
		});
		
		if(vm.loggedIn){
			Auth.getUser()
				.success(function(data){
					vm.user = data;
				});
		}
			
		vm.doLogin = function() {
			vm.processing = true;
			
			vm.error = '';
			
			// call the Auth.login() function
				Auth.login(vm.loginData.username, vm.loginData.password)
				.success(function(data) {
					vm.processing = false;
					
					Auth.getUser()
						.then(function(data) {
							vm.user = data.data;
						});
					
					if(data.success){
						$location.path('/users');
						
						
					}
					else{
						vm.error = data.message;
					}
					// get user information after logging in
					
					// if a user successfully logs in, redirect to users page
					//$location.path('/users');
				});
		};
			
		vm.doLogout = function(){
			Auth.logout();
			$location.path('/');
		};
		
	});