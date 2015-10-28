angular.module('routerApp', ['routerRoutes', 'ngAnimate'])

.controller('mainController', function(){
	// view-model instead of $scope
	var vm = this;
	
	vm.bigMessage = 'A smooth sea never made a skilled sailor.';
})

.controller('homeController', function(){
	var vm = this;
	
	vm.message = 'This is the home page!';
})

.controller('aboutController', function(){
	var vm = this;
	
	vm.message = 'Look! I am an about page.';
})

.controller('contactController', function(){
	var vm = this;
	
	vm.message = 'Contact us! JK. This is a demo.';
});