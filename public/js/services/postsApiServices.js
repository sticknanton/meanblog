var api = angular.module('postsApiServices', [])

api.factory('postsApi',['$http', function ($http) {
  var baseUrl = '/api/posts'
  var postsApi = {}

  postsApi.create = function(post) {
    return $http.post(baseUrl, {post: post})
  }
  postsApi.getAll = function () {
      return $http.get('/api/posts')
  }

  return postsApi;
}])
