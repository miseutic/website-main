function registerMe() {
    var registerUser = new XMLHttpRequest();

    registerUser.open("POST", "http://127.0.0.1:8080/users", true);
    registerUser.setRequestHeader("Content-Type", "application/json");
    registerUser.onload = function () {
        $('#registerModal').modal('hide');
        $('#successModal').modal('show');
    }
    var username = document.getElementById("inputUsername").value;
    var password = document.getElementById("inputPassword").value;
    var payload = { username: username, password: password }
    registerUser.send(JSON.stringify(payload));
}