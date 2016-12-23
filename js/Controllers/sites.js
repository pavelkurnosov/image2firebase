myApp.controller('bringitController', ['$scope', '$rootScope', 'Authentication', '$firebaseAuth', '$location', '$firebaseObject', '$firebaseArray', 'FIREBASE_URL', function ($scope, $rootScope, Authentication, $firebaseAuth, $location, $firebaseObject, $firebaseArray, FIREBASE_URL) {

    //controller to take in the form input and add the meeting to firebase

    //create the firebase object and the reference to the location
    //var ref = new Firebase(FIREBASE_URL);
    //auth is the link to this apps auth service
    /*var auth = $firebaseAuth(ref);
    auth.$onAuth(function (authU) {
        if (authU) {
            var bringitRef = new Firebase(FIREBASE_URL + '/broughts');
            var broughtsArray = $firebaseArray(bringitRef);

            broughtsArray.$loaded().then(function (data) {
                $rootScope.howManyBroughts = broughtsArray.length;
            });//once meeting data is loaded will populate


            broughtsArray.$watch(function (data) {
                $rootScope.howManyBroughts = broughtsArray.length;
            });//watches the array and updates rootscope object when changed

            //add all the meetings to the scope so they can be seen on the view
            $scope.broughts = broughtsArray;

            //the add site 
            $scope.addBringIt = function () {
                broughtsArray.$add({
                    enteredBy: $scope.enteredBy,
                    dateBrought: $scope.dateBrought.getTime(),
                    siteName: $scope.siteName,
//                    bringItImage: $scope.bringItImage,
                    comments: $scope.comments,
                    date: Firebase.ServerValue.TIMESTAMP
                }).then(function () {
                    $('#addBringIt').modal('hide');
                    $location.path('/bringit');
                });
            };

            $scope.deleteBrought = function (key) {
                broughtsArray.$remove(key);

            }


            $scope.confirmLogout = function () {
                $("#logoutModal").modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();

                console.log("pressed confirm")
                Authentication.confirmLogout()
            }


            //listen and then disaply if new site added (from any client)
            bringitRef.on('child_added', function (dataSnapshot) {
                // code to handle new value.
                if (dataSnapshot.val().name) {
                    $.notify("Site " + dataSnapshot.val().name + "added", "info");
                } else {
                    $.notify("Site added", "info");

                }
            });


        }//authenticated

    });//onAuth
*/

    // Added by Pavel
    var bringitRef = new Firebase(FIREBASE_URL + '/broughts');
    var broughtsArray = $firebaseArray(bringitRef);

    broughtsArray.$loaded().then(function (data) {
        $rootScope.howManyBroughts = broughtsArray.length;
    });//once meeting data is loaded will populate


    broughtsArray.$watch(function (data) {
        $rootScope.howManyBroughts = broughtsArray.length;
    });//watches the array and updates rootscope object when changed

    //add all the meetings to the scope so they can be seen on the view
    $scope.broughts = broughtsArray;

    //the add site
    $scope.addBringIt = function () {
        broughtsArray.$add({
            enteredBy: $scope.enteredBy,
            dateBrought: $scope.dateBrought.getTime(),
            siteName: $scope.siteName,
//          bringItImage: $scope.bringItImage,
            comments: $scope.comments,
            image: prevImg,
            date: Firebase.ServerValue.TIMESTAMP
        }).then(function () {
            $('#addBringIt').modal('hide');
            $location.path('/bringit');
        });
    };

    $scope.deleteBrought = function (key) {
        broughtsArray.$remove(key);

    }

    $scope.confirmLogout = function () {
        $("#logoutModal").modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

        console.log("pressed confirm")
        Authentication.confirmLogout()
    }

    //listen and then disaply if new site added (from any client)
    bringitRef.on('child_added', function (dataSnapshot) {
        // code to handle new value.
        if (dataSnapshot.val().name) {
            $.notify("Site " + dataSnapshot.val().name + "added", "info");
        } else {
            $.notify("Site added", "info");

        }
    });

    // vars
    var ref = new Firebase(FIREBASE_URL),
        fileInput = document.querySelector('#image-input'),
        preview = document.querySelector('#image-display');
        prevImg = null;

    // upload file fn
    $scope.uploadImage = function (callback) {
        fileInput.addEventListener("change", function () {
            preview.innerHTML = '';
            if (this.files[0].size < '307200') {
                if (this.files.length) {
                    preview.innerHTML = '<span class="info">Save Image please take a momment..</span>';
                    var e = new FileReader();
                    e.onload = function (e) {
                        prevImg = e.target.result;
                        /*ref.push({
                            image: e.target.result,
                        }, callback);*/
                        var html = [
                            '<span class="thumb expand">',
                            '	<img class="preview-img" src="' + prevImg + '">',
                            '</span>'
                        ].join('');
                        preview.innerHTML = html;
                        fileInput.value = '';
                    }, e.readAsDataURL(this.files[0]);
                }
            } else {
                preview.innerHTML = '<span class="info">File too big :(</span>';
                var s = setTimeout(function () {
                    fileInput.value = '';
                    $scope.getImages();
                    clearTimeout(s);
                }, 2000);
            }
        }, false);
    };

    // get images fn
    $scope.getImages = function () {

    };



    // Remove images from firebase
    $scope.removeImage = function (id) {
        if (confirm('Are you sure!')) {
            ref.child(id).remove();
        } else {
            return false;
        }
    };

    // Zoom images
    $scope.expand = function () {
        var images = document.querySelectorAll('.expand img');
        var arr = Array.prototype.slice.call(images);
        // var lightbox = document.querySelector('.img-full-container');
        Array.prototype.forEach.call(arr, function (obj, index) {
            obj.addEventListener('click', function (e) {
                e.preventDefault();
                var link = obj.getAttribute('src');
            });
        });

        $('.preview-img').click(function () {
            if (confirm('Are you sure want to delete this image?')) {
                ref.child($(this).attr('data')).remove();
            } else {
                return false;
            }
        })
    };


    // upload images and get
    $scope.uploadImage(function () {

    });

    $scope.showModal = function () {
        $scope.enteredBy = '';
        $scope.siteName = '';
        $scope.dateBrought = '';
        $scope.comments = '';
        $scope.image = '';
        $scope.enteredBy = '';
        $('.preview-img').remove();
        $("#addBringIt").modal();
    }
}]);
