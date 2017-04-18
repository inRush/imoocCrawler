'use strict';
module.exports = app => {
    app.role.use('admin', function () {
        const login = this.session.admin;
        if (login) {
            return true;
        }
        return false;
    });
};