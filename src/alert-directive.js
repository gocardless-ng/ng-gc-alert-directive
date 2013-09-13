'use strict';

angular.module('gc.alert', [
  'alert-template.html'
])
.directive('alert', [
  '$location', '$window',
  function alertDirective($location, $window) {

    return {
      restrict: 'E',
      templateUrl: 'alert-template.html',
      transclude: true,
      replace: true,
      scope:{
        type: '@',
        close: '&'
      },
      link: function alertDirectiveLink(scope, element) {
        function apply(fn) {
          return function() {
            scope.$apply(fn);
          };
        }

        // window needed for initial transition
        $window.setTimeout(apply(function() {
          element.addClass('alert--show');
        }), 0);

        // Hide
        $window.setTimeout(apply(function() {
          element.removeClass('alert--show');
          // Remove element
          $window.setTimeout(apply(function() {
            scope.close();
          }), 500);
        }), 3500);

        var hasShown;
        scope.$watch(function alertPathWatch() {
          return $location.url();
        }, function alertPathWatchAction() {
          if (hasShown) { scope.close(); }
          hasShown = true;
        });
      }
    };

  }
]);
