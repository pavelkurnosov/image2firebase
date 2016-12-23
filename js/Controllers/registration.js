myApp.controller('RegistrationController', ['$scope', 'Authentication', 'FIREBASE_URL',
    function ($scope, Authentication, FIREBASE_URL) {

        $scope.login = function () {

            Authentication.login($scope.user)
        }

        $scope.register = function () {
            Authentication.register($scope.user)
        }

        $scope.logout = function () {
            Authentication.logout()
        }

        $scope.message = " ";

        var ref = new Firebase(FIREBASE_URL);

        $scope.resetPassword = function (email) {
        // Authentication.resetPassword($scope.email)
            console.log("made in to auth ethods for reset passowrd with email - " + email);
            var credentials = {email: email};
            console.log("credentials - " + credentials);

            ref.resetPassword({
                email: email
            }, function (error) {
                if (error) {
                    switch (error.code) {
                        case "INVALID_USER":
                            $scope.message = "The specified user account does not exist.";
                            $scope.$apply()

                            console.log("The specified user account does not exist.");
                            break;
                        default:
                            console.log("Error resetting password:", error);
                    }
                } else {
                    console.log("Password reset email sent successfully!");
                }
            });

        }


    }]);