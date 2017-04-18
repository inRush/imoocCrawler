module.exports = app => {
    class RollCallController extends app.Controller {
        async index() {
            let students = await this.ctx.service.student.getAll();
            for (let i = 0; i < students.length; i++) {
                let answer = await this.ctx.service.answer.getByStudentId(students[i].studentId);
                students[i].answer = answer.right + answer.littleRight + answer.mistake;
            }

            await this.ctx.render('rollcall.pug', {
                title: "点名册",
                students: students,
                isAdmin: this.ctx.session && this.ctx.session.admin ? true : false,

            });
        }
        async answer() {
            let answer = this.ctx.request.body;
            let student = await this.ctx.service.student.getByImoocId(answer.number);
            let result = await this.ctx.service.answer.updateAnswer(student.studentId, answer.answer);
            if (result.ok == 1) {
                this.ctx.body = {
                    success: 1,
                    err: ""
                }
            } else {
                this.ctx.body = {
                    success: 0,
                    err: "数据库错误"
                }
            }
            this.ctx.status = 200;
        }
    }
    return RollCallController;
}