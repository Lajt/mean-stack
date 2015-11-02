angular.module('authService', [])
	.factory('AuthToken', function($window){
		var authTokenFactory = {};
		
		authTokenFactory.getToken = function(){
			return $window.localStorage.getItem('token');	
		};
		
		authTokenFactory.setToken = function(token){
			if(token){
				$window.localStorage.setItem('token', token);
			}
			else{
				$window.localStorage.removeItem('token');
			}
		};
		
		return authTokenFactory;
	})
	.factory('Auth', function($http, $q, AuthToken){
		var authFactory = {};
		
		authFactory.login = function(username, password){
			return $http.post('/api/authenticate', {
				username: username,
				password: password
			})
				.success(function(data){
					AuthToken.setToken(data.token);
					return data;
				});
		};
		
		authFactory.logout = function(){
			AuthToken.setToken();
		};
		
		authFactory.isLoggedIn = function(){
			if(AuthToken.getToken()){
				return true;
			}
			else{
				return false;
			}
		};
		
		// get the logged in user
		authFactory.getUser = function() {
			if (authFactory.isLoggedIn){ // not sure if that's a way to do it
				return $http.get('/api/me');
			}
			else{
				return $q.reject({ message: 'User has no token.' });    
			}
		};
		
		return authFactory;
	})
	.factory('AuthInterceptor', function($q, $location, AuthToken){
		var interceptorFactory = {};
		
		interceptorFactory.request = function(config){
			var token = AuthToken.getToken();
			
			if(token){
				config.headers['x-access-token'] = token;
			}	
			return config;
		};
		
		interceptorFactory.responseError = function(response){
			if(response.status = 403){
				$location.path('/login');
			}
			return $q.reject(response);
		};
		
		return interceptorFactory;
		
	});