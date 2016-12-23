myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$window', '$location', '$firebaseObject','FIREBASE_URL', function($rootScope, $firebaseAuth, $window, $location, $firebaseObject, FIREBASE_URL){
    
var ref = new Firebase(FIREBASE_URL);
ref.onAuth(onauth);

var auth = $firebaseAuth(ref);
    
    // Create a callback which logs the current auth state - for page refeshing and such
function onauth(authData) {
  if (authData) {
    console.log("User " + authData.email + " is logged in with " + authData.provider);
    var profile = $firebaseObject(ref.child('user').child(authData.uid));
    $rootScope.currentUser = profile;
  } else {
    console.log("User is logged out");
  }
}

    
    var myObject = {
          login: function(user){
              auth.$authWithPassword({
                  email: user.email,
                  password: user.password
              }).then(function(regUser){
            
            //set the user details to an object then send to the rootscope
            var user = myObject.userDetails(regUser);
            $rootScope.currentUser = user;
                  
             $location.path('/sites');
              }).catch(function(error){
           $rootScope.message = "Dam" + error.message;
              });
        },
        // login function
        
        logout: function(){
        $("#logoutModal").modal();
    console.log('log out pressed');
    //taviPatArray.splice(index, 1);   
        },//logout method
        

    confirmLogout : function(){
    console.log('confirm logOut');
     $.notify("User Logged out" , "info");

    $rootScope.currentUser = '';
    $window.location.href = "#/login";
    return auth.$unauth();     },
        
        requireAuth: function(){
            return auth.$requireAuth(); 
         $rootScope.currentUser = user;

        }, //require authentication for accessing some pages

        register: function(user){
             auth.$createUser({
            email: user.email,
            password: user.password 
        }).then(function(regUser){
            //user is added to database
             var regRef = new Firebase(FIREBASE_URL + 'user').child(regUser.uid).set(
            {
            date: Firebase.ServerValue.TIMESTAMP,
            refregUser : regUser.uid,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email        
            });
                 
            myObject.login(user);

            $rootScope.message = "Welcome" + "--" + user.firstname
            + ", Thanks for registering";
            currentUser = user;
            $rootScope.currentUser = user;
            

        }) .catch(function(error){
          $rootScope.message = error.message;   
        });           
        },  //register function  
        
        userDetails: function(user){  
        var profile = $firebaseObject(ref.child('user').child(user.uid));
            return profile;
        }
    };
    
                return myObject;

                   

}]);//factory for logging in
