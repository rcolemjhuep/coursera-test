(function () {
  "use strict";
  //Based on here https://docs.angularjs.org/guide/forms
  angular.module('public')
    .directive('signup', SignUpDirective)

  SignUpDirective.$inject = ['$http', 'ApiPath', '$q'];
  function SignUpDirective($http, ApiPath, $q) {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
        ctrl.$asyncValidators.signup = function (modelValue, viewValue) {

          if (ctrl.$isEmpty(modelValue)) {
            // consider empty model is not valid
            return $q.reject('Empty Value')
          }

          // defer our output
          var def = $q.defer();

          var url = `${ApiPath}/menu_items/${modelValue}.json`
          $http.head(url).then(function (result) {
            def.resolve()
          }, function (result) {
            def.reject()
          });


          return def.promise
        };
      }
    };
  };

})();
