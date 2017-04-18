'use strict';

describe('test/app/controller/user.test.js', () => {
    it('should app auto init on setup.js', () => {
        // app is auto init at `test/.setup.js`
        assert(app);
        assert(mock);
        // mock alias
        assert(mm);
        assert(request);
    });

    it('没有登录直接进去rollcall页面会302跳转到login页面', async() => {
        let result = await request(app.callback())
            .get('/rollcall')
            .expect(302);
    });
    it('登录密码错误', async() => {
        app.mockCsrf();
        let result = await request(app.callback())
            .post('/login')
            .type('form')
            .send({
                _csrf: '"csrf"',
                password: '12334'
            })
            .expect(200)
        assert(result.text.indexOf('管理员登录'));
    })
    it('登录成功后直接跳转到RollCall页面,在rollcall页面应该有89个photo', async() => {
        app.mockCsrf();
        await request(app.callback())
            .post('/login')
            .type('form')
            .send({
                _csrf: '"csrf"',
                password: 'webadmin'
            })
            .expect(302)
            .expect(res => {
                assert(res.text === 'Redirecting to <a href="/rollcall">/rollcall</a>.');
            })
        
    });

    it('管理员登录密码不能为空',async ()=>{
        await request(app.callback())
            .post('/login')
            .type('form')
            .send({
                _csrf: '"csrf"',
                password: ''
            })
            .expect(422)
    })

});