const loginRule = {
    _csrf: 'string',
    password: {
        type: 'string',
        required: true
    }
}
module.exports = app => {
    class UserController extends app.Controller {
        async login() {
            await this.ctx.render('login.pug', {
                csrf: this.ctx.csrf
            });
        }
        async logout() {
            this.ctx.session = null;
            this.ctx.redirect('/');
        }
        async authorization() {
            this.ctx.validate(loginRule);
            const {
                password
            } = this.ctx.request.body;
            if (password && password != "" && password == "123") {
                this.ctx.session.admin = true;
                this.ctx.session.maxAge = 120 * 60 * 1000;
                this.ctx.rotateCsrfSecret();
                await this.ctx.redirect('/rollcall');
            } else {
                await this.ctx.render('login.pug', {
                    csrf: this.ctx.csrf,
                    err: 0
                });
            }
        }
    }
    return UserController;
}