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

    let tempstudentId = "151";
    let answer;
    before(async() => {
        await app.ready();
        answer = app.model.answer;
        let anw = await new answer({
            studentId:tempstudentId,
            right:0,
            littleRight:0,
            mistake:0
        })
        anw.save();
    })
    after(async ()=>{
        await answer.remove({studentId:tempstudentId});
    })
    
    it('查找对应学生的answer', async() => {
        const ctx = app.mockContext();
        const anw = await ctx.service.answer.getByStudentId(tempstudentId);
        assert(anw);
        assert(anw.studentId === tempstudentId);
        assert(anw.right === 0 && anw.littleRight === 0 && anw.mistake === 0);

    });
    it('更新学生的回答情况,right增加1',async ()=>{
        const ctx = app.mockContext();
        await ctx.service.answer.updateAnswer(tempstudentId,1);
        let anw = await answer.findOne({studentId:tempstudentId});
        assert(anw.right === 1 && anw.littleRight === 0 && anw.mistake === 0);
    })
    it('更新学生的回答情况,littleRight增加1',async ()=>{
        const ctx = app.mockContext();
        await ctx.service.answer.updateAnswer(tempstudentId,0);
        let anw = await answer.findOne({studentId:tempstudentId});
        assert(anw.right === 1 && anw.littleRight === 1 && anw.mistake === 0);
    })
    it('更新学生的回答情况,mistake增加1',async ()=>{
        const ctx = app.mockContext();
        await ctx.service.answer.updateAnswer(tempstudentId,-1);
        let anw = await answer.findOne({studentId:tempstudentId});
        assert(anw.right === 1 && anw.littleRight === 1 && anw.mistake === 1);
    })

});