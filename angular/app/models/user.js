"use strict";
var User = (function () {
    function User(id, name, username, email, totalVictories, totalScore, token, password, confirmPassword, avatar) {
        this._id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.totalVictories = totalVictories;
        this.totalScore = totalScore;
        this.token = token;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.avatar = avatar;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map