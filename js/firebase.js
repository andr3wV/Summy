//TODO: Change alerts to actual on screen pop ups
//      Redirect to a main screen which you have to make
//      Forgot password page

const firebaseConfig = {
    apiKey: "AIzaSyCy3wrzcnkfVovKUoSFGE8g6SqnoFJsJ6c",
    authDomain: "wander-f4133.firebaseapp.com",
    databaseURL: "https://wander-f4133-default-rtdb.firebaseio.com",
    projectId: "wander-f4133",
    storageBucket: "wander-f4133.appspot.com",
    messagingSenderId: "137646729109",
    appId: "1:137646729109:web:a796bd5f45320c6222789c",
    measurementId: "G-SCHEMTKHSH"
};
  
firebase.initializeApp(firebaseConfig);
// Get a reference to the database

// Register a new user
function register() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    //Validate input fields
    if(!validate_email(email)) {
        alert("Email is incorrect!");
        return; // stops code
    } else if(!validate_password(password)) {
        alert("Password must be at least 6 characters!");
        return
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function() {
        // Declare user variable
        var user = firebase.auth().currentUser
        
        // Add this user to Firebase Database
        var database_ref = firebase.database().ref()

        // Create User data
        var user_data = {
            email : email, 
            last_login : Date.now()
        }
        // Push to Firebase Database
        database_ref.child('users/' + user.uid).set(user_data)

        // User registered successfully
        alert("Registration Successful!!")
        console.log("User registered successfully");
        window.location.href = "login.html"; // Redirects to login page
        })
        .catch(function(error) {
            var error_code = error.code;
            var error_message = error.message;
        
            alert(error_message);
    });
 }

// Login an existing user
function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    //Validate input fields
    if(!validate_email(email)) {
        alert("Email is incorrect!");
        return; // stops code
    } else if(!validate_password(password)) {
        alert("Password must be at least 6 characters!");
        return
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function() {
        // Declare user variable
        var user = firebase.auth().currentUser

        // Add this user to Firebase Database
        var database_ref = firebase.database().ref()

        // Create User data
        var user_data = {
        last_login : Date.now()
        }
        
         // Push to Firebase Database
        database_ref.child('users/' + user.uid).update(user_data)

        alert("Login Successful!!")
    })
    .catch(function(error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code;
        var error_message = error.message;

        alert(error_message);
    });
}


// Validate Functions
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is good
        return true
    } else {
        // Email is not good
        return false
    }
    }
    
    function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
        return false
    } else {
        return true
    }
    }
    
    function validate_field(field) {
    if (field == null) {
        return false
    }
    
    if (field.length <= 0) {
        return false
    } else {
        return true
    }
    }