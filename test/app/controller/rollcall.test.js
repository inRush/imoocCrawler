'use strict';

describe('test/app/controller/rollcall.test.js', () => {

    afterEach(mm.restore);
    it('should app auto init on setup.js', () => {
        // app is auto init at `test/.setup.js`
        assert(app);
        assert(mock);
        // mock alias
        assert(mm);
        assert(request);
    });

    it('rollcall页面中应该有89个photo', async() => {
        app.mockSession({
            admin: true
        });
        let result = await request(app.callback())
            .get('/rollcall')
            .expect(200);

        let text = result.text;
        let photo_count = 0;
        let pos = 0;
        while (true) {
            pos = text.indexOf('photo_front', pos + 1);
            if (pos <= 0) break;
            photo_count++;
        }
        assert(photo_count == 89);
    });

});