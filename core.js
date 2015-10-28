var app = angular.module("demoApp", []);

app.factory('taskFactory', function() {

  var tasks = [
  { task:'Book',hours:3  },
  { task:'Book1',hours:4 },
  { task:'Book2',hours:5},
  ];

  var stevi = [{task:'Stevi Task Default',hours:2 }];
  var andy = [{task:'Andy Task Default',hours:4}];
  var stevi_deleted=[{task:'Titanic...',hours:5}];
  var andy_deleted=[{task:'Titanic...........',hours:3}]
  var factory = {};

  factory.gettasks = function() {
    return tasks;
  }

  factory.delete = function(task) {
    var index = tasks.indexOf(task);
    tasks.splice(index, 1);
  }

  factory.delete_stevi = function(task) {
    var index = tasks.indexOf(task);
    stevi.splice(index, 1);
  }

  factory.getSold_stevi = function() {
    return stevi;
  }
  factory.getSold_stevi_deleted = function() {
    return stevi_deleted;
  }
  factory.getSold_andy_deleted = function() {
    return andy_deleted;
  }
  
  factory.getSold_andy = function() {
    return andy;
  }

  factory.assignTask_stevi=function(task){
    
    var index = tasks.indexOf(task);
    tasks.splice(index, 1);
    stevi.push(task);
  }

  factory.assignTask_andy=function(task){
    
    var index = tasks.indexOf(task);
    tasks.splice(index, 1);
    andy.push(task);
  }
  
  factory.stevi_deleted_tasks=function(task){
    var index = tasks.indexOf(task);
    stevi.splice(index, 1);
    stevi_deleted.push(task);
  }

  factory.andy_deleted_tasks=function(task){
    var index = tasks.indexOf(task);
    andy.splice(index, 1);
    andy_deleted.push(task);
  }
  return factory;
});

app.controller("newtaskController", function($scope, taskFactory) {

  $scope.tasks = taskFactory.gettasks();

  $scope.addtask = function() {
    console.log($scope.newtask)
    $scope.tasks.push($scope.newtask);
    $scope.newtask = {};
  }

});

app.controller("taskController", function($scope, taskFactory) {
  
  $scope.tasks = taskFactory.gettasks(); 

  $scope.delete = function(task) {
    taskFactory.delete(task);
  }

  $scope.assign = function(task) {
    taskFactory.assignTask(task);
  }
  $scope.addtask = function() {
    console.log($scope.newtask)
    $scope.tasks.push($scope.newtask);
    $scope.newtask = {};
  }

});

app.controller("assignController", function($scope, taskFactory) {

  $scope.options = ['stevi','Andy'];
  
  $scope.assign = function(task) {
    console.log($scope.newtask);
      
    if($scope.newtask.type=='stevi')
      taskFactory.assignTask_stevi(task);   
    else
      taskFactory.assignTask_andy(task);

  }
 

});

app.controller("steviController", function($scope, taskFactory) {
  $scope.stevi = taskFactory.getSold_stevi();
  $scope.stevi_deleted=taskFactory.getSold_stevi_deleted(); 
  $scope.delete=function(task){
    taskFactory.stevi_deleted_tasks(task);
   
  }

  $scope.comission = function() {
    var total = 0;
    $scope.stevi.forEach(function(task) {
      total += (parseInt(task.hours));
    });
    return total;
  };
});

app.controller("andyController", function($scope, taskFactory) {
  $scope.andy = taskFactory.getSold_andy(); 
  $scope.andy_deleted=taskFactory.getSold_andy_deleted();
  $scope.comission = function() {
    var total = 0;
    $scope.andy.forEach(function(task) {
      total += (parseInt(task.hours));
    });
    return total;
  };
  $scope.delete=function(task){
    taskFactory.andy_deleted_tasks(task);
   
  }
});