class User {
    constructor(userId, username, password, mobile_number, email_address, profile_picture, first_name, last_name, gender, address) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.mobile_number = mobile_number;
        this.email_address = email_address;
        this.profile_picture = profile_picture;
        this.first_name = first_name;
        this.last_name = last_name;
        this.gender = gender;
        this.address = address;
    }
    getUserId() {
        return this.userId;
    }
    getUsername() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
    getMobileNumber() {
        return this.mobile_number;
    }
    getEmail() {
        return this.email_address;
    }
    getProfile() {
        return this.profile_picture;
    }
    getFirst() {
        return this.first_name;
    }
    getLast() {
        return this.last_name;
    }
    getGender() {
        return this.gender;
    }
    getAddress() {
        return this.address;
    }
}
module.exports = User;