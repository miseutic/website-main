function fetchUser() {
    var request = new XMLHttpRequest();
    request.open('GET', '/users', true);
    //This command starts the calling of the account api
    request.onload = function () {
        //get all the reviews records into our account array
        user_array = JSON.parse(request.responseText);
        console.log(user_array);
    };
    request.send();
}

function updateUser() {
    if (sessionStorage.getItem("token") != "invalid") {
        var signupUser = new XMLHttpRequest()
        for (var i = 0; i < user_array.length; i++) {
            if (user_array[i].username === sessionStorage.getItem("username")) {
                userId = user_array[i].userId
            }
        }
        console.log(userId)
        signupUser.open("PUT", '/users' + "/" + userId, true)
        signupUser.setRequestHeader("Content-Type", "application/json")
        signupUser.onload = function () {
            $('#profileModal').modal('hide');
            $('#successModal').modal('show');
        }

        var username = sessionStorage.getItem("username");
        var first_name = document.getElementById("first_name").value;
        var last_name = document.getElementById("last_name").value;
        var password = document.getElementById("password").value;
        var email_address = document.getElementById("email_address").value;
        var gender = document.getElementById("gender").value;
        var mobile_number = document.getElementById("mobile_number").value;
        var address = document.getElementById("address").value;

        var payload = {
            email: email_address,
            phone_number: mobile_number,
            gender: gender,
            real_first_name: first_name,
            real_last_name: last_name,
            address: address,
            password: password,
            username: username
        }
        signupUser.send(JSON.stringify(payload))
    }
}

//This function deletes the selected review in a specific movie
function deleteUser(element) {
    var response = confirm("Are you sure you want to delete your account?");

    if (response == true) {
        var item = element.getAttribute("item"); //get the current item
        var delete_user_url = user_url + "/" + user_array[item].userId;
        var eraseUser = new XMLHttpRequest();
        eraseUser.open("DELETE", delete_user_url, true);
        eraseUser.onload = function () {
            fetchUser();
        };
        eraseUser.send();
    }
}