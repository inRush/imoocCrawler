'use strict';

describe('test/app/controller/home.test.js', () => {
	it('should app auto init on setup.js', () => {
		// app is auto init at `test/.setup.js`
		assert(app);
		assert(mock);
		// mock alias
		assert(mm);
		assert(request);
	});

	it('访问web学习主页面，返回200', async () => {
		await request(app.callback())
			.get('/')
			.expect(200);
	});
	it('多次访问主页',async () =>{
		await request(app.callback())
			.get('/')
			.expect(200);
		await request(app.callback())
			.get('/')
			.expect(200);
		let result = await request(app.callback())
			.get('/')
			.expect(200);
		assert(result.text);
	});

	it('查询请求',async () =>{
		let result1 = await request(app.callback())
			.get('/search?q=%e9%bb%84&c=9')
			.expect(200)
		assert(result1.text.indexOf('黄')>0 && result1.text.indexOf('9'));
		let result2 = await request(app.callback())
			.get('/search?q=%e9%bb%84&c=36')
			.expect(200)
		assert(result2.text.indexOf('黄')>0 && result2.text.indexOf('36'));
	});

	it('没有查询字段的查询请求',async ()=>{
		await request(app.callback())
			.get('/search?c=9')
			.expect(302);
	})

	it('没有课程字段的查询请求',async ()=>{
		let result = await request(app.callback())
			.get('/search?q=%e9%bb%84')
			.expect(200);
		assert(result.text.indexOf('36'));
	})

});