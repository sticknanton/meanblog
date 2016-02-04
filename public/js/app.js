var app = angular.module('MeanBlogApp', ['ngCookies'])

app.controller('usersController', ['$scope','$http','$cookies', function ($scope, $http, $cookies) {
  $scope.posts = [];
  var baseUrl = '/api/users';
  $scope.createUser = function(user){
    $http.post(baseUrl, {user: user}).then(function (response) {
      console.log(response.data);
    })
  }

  $scope.logIn = function(username, password) {
    console.log(username, password);
    $http.post(baseUrl+'/authenticate', {username: username, password: password}).then(function(response) {
      console.log(response);
      $cookies.put('token', response.data.token);
      $scope.currentUser = response.config.data.username;
      $scope.logged=true;
    })
  }

  $scope.newPost = function( post ) {
    post.author = $scope.currentUser;
    $http.post('/api/posts', {post: post}).then(function (response) {
      console.log(response.data);
      $scope.posts.push(response.data)
      $scope.post={};
    })
  }

  $scope.getPosts = function () {
    $http.get('/api/posts').then(function (response) {
      $scope.posts = response.data.posts;
    })
  }
  var init = function () {
   $scope.getPosts();
  };
  init();
}])
