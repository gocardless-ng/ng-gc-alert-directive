/**
 * @license ng-gc-alert-directive v0.1.0
 * (c) 2013-2013 GoCardless, Ltd.
 * https://github.com/gocardless-ng/ng-gc-alert-directive.git
 * License: MIT
 */
(function(){
'use strict';

'use strict';

angular.module('gc.alertController', [
  'gc.alertService'
]).controller('AlertController', [
  '$scope', 'AlertService',
  function AlertController($scope, AlertService) {

    $scope.appAlerts = AlertService.get();
    $scope.closeAlert = function(index) {
      $scope.appAlerts.splice(index, 1);
    };

  }
]);

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
      link: function alertDirectiveLink(scope) {
        // Hide
        $window.setTimeout(scope.$apply(function() {
          scope.close();
        }), 5000);

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

'use strict';

angular.module('gc.alertService', [])
.factory('AlertService', [
  function AlertService() {
    var alerts = [];

    return {
      get: function get() {
        return alerts;
      },
      success: function success(message) {
        this._add({ type: 'success', message: message });
        return this;
      },
      error: function error(message) {
        this._add({ type: 'error', message: message });
        return this;
      },
      _add: function _add(alert) {
        if (this._indexOf(alert) === -1) {
          alerts.push(alert);
        }
        return this;
      },
      _indexOf: function _indexOf(alert) {
        var alertIndex = -1;
        alerts.forEach(function(item, index){
          if (item.message === alert.message &&
              item.type === alert.type) {
            alertIndex = index;
          }
        });
        return alertIndex;
      }
    };

  }
]);

angular.module('alert-template.html', []).run(function($templateCache) {
  $templateCache.put('alert-template.html',
    '<div class="alert"><div class="notification u-relative"><span ng-transclude=""></span> <a href="" ng-click="close()">close</a></div></div>');
});
})();