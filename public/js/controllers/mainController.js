var ctlr = angular.module('mainControllers', [])

ctlr.controller('mainController', ['$scope','$http','$cookies','usersApi','postsApi', function ($scope, $http, $cookies, usersApi, postsApi) {

  $scope.posts = [];

  $scope.createUser = function(user){
    usersApi.createUser(user).then(function (response) {
      $scope.logIn(user.username, user.password);
    })
  }

  $scope.logIn = function(username, password) {
    usersApi.auth(username, password).then(function(response) {
      if(response.data.token){
        $scope.cookieStuff(response)
        $scope.setUser(response)
      }else {
          $scope.username=''; $scope.password='';
      }
    })
  }

  $scope.newPost = function( post ) {
    post.author = $cookies.get('user');
    postsApi.create(post).then(function (response) {
      $scope.posts.push(response.data)
      $scope.post={};
    })
  }

  $scope.getPosts = function () {
    postsApi.getAll().then(function (response) {
      $scope.posts = response.data.posts;
    })
  }
  $scope.setUser =function(response){
    $scope.currentUser = response.config.data.username;
    $scope.logged=true;
    $scope.username=''; $scope.password='';
  }
  $scope.cookieStuff = function (response) {
    $cookies.put('user', response.config.data.username);
    $cookies.put('token', response.data.token);
  }
  $scope.logOut = function () {
    $cookies.remove('user');
    $cookies.remove('token');
    $scope.currentUser = '';
    $scope.logged=false;
  }
  $scope.hideForm = function functionName() {
    if($scope.searchOnly){
      $scope.searchOnly = false;
    }else {
      $scope.searchOnly = true;
    }
  }

  $scope.checkToken = function() {
    var token = $cookies.get('token');
    if(token){
      $scope.logged=true;
      if($cookies.get('user')){
        $scope.currentUser=$cookies.get('user')
      }
    }
  }

  var init = function () {
   $scope.checkToken();
   $scope.searchOnly=false;
   $scope.getPosts();
  };
  init();
}])
