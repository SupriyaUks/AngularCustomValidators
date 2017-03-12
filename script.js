(function() {
  var app = angular.module("myApp", []);
  app.controller("myCtrl", myCtrl);
  app.directive("myCustVal", myCustVal);
  
  function myCustVal() {
    return {
      restrict : 'A',
      require : 'ngModel',
      link : function(scope, el, attr, ngModelCtrl) {
        ngModelCtrl.$validators.myCustVal = function(modelVal, viewVal) {
          if(viewVal.includes("gmail.com"))
            return true;
          else
            return false;
        }
      }
    }  
  }
  
  function myCtrl($scope) {
    $scope.validate = validateUser;
    $scope.isTelValid = true;
    $scope.isTelString = false;
    $scope.isValidDate = true;
    $scope.users = [];
    $scope.changeMsg = function() {
      $scope.success = "";
    }
    
    function validateUser(user) {
      var telephone = user.tel;
      var date = user.date;

      if (date) {
        date = date.replace(/\D/g, "");
        var month = parseInt(date.substring(0, 2), 10);
        var day = parseInt(date.substring(2, 4), 10);
        var year = parseInt(date.substring(4, 8), 10);

        if((isNaN(month)) || (isNaN(day)) || (isNaN(year))) $scope.isValidDate = false;
        else if ((month < 1) || (month > 12)) $scope.isValidDate = false;
        else if ((day < 1) || (day > 31)) $scope.isValidDate = false;
        else if (((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day > 30)) $scope.isValidDate = false;
        else if ((month == 2) && (((year % 400) == 0) || ((year % 4) == 0)) && ((year % 100) != 0) && (day > 29)) $scope.isValidDate = false;
        else if ((month == 2) && ((year % 100) == 0) && (day > 29)) $scope.isValidDate = false;
        else if ((month == 2) && (day > 28)) $scope.isValidDate = false;
        else $scope.isValidDate = true;
      }

      if (telephone) {
        var reg = /[a-zA-Z]+/;
        var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
        var digits = telephone.replace(/\D/g, "");
        $scope.isTelString = reg.test(telephone);
        $scope.isTelValid = phoneRe.test(digits);
      }
      
      if($scope.isTelValid && !$scope.isTelString && $scope.isValidDate) {
        $scope.success = "Form validation is successful !!!";
      } else{
        $scope.success = "";
      }
    }
  }
})();