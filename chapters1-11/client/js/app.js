angular.module('firstApp', [])
.controller('mainController', function(){
	// bind 'this' to vm(view-model)
	var vm = this;
	
	vm.message = 'Hello there! Come and see how good i look!';
	
	vm.computers = [
		{ name: 'Macbook', color: 'silver', nerdness: 7},
		{ name: 'PC', color: 'black', nerdness: 10},
		{ name: 'Laptop', color: 'gray', nerdness: 4}
	];
	
	vm.computerData = [];
	
	vm.addComputer = function(){
		vm.computers.push({
			name: vm.computerData.name,
			color: vm.computerData.color,
			nerdness: vm.computerData.nerdness
		});
		vm.computerData = [];
	};
	
});