module.exports = app => {
    class Answer extends app.Service {
        async getByStudentId(s_id) {
            let answer = await this.ctx.model.answer.findOne({
                studentId: s_id
            });
            return answer;
        }

        async updateAnswer(s_id, answer) {
            let result;
            let anw = {};
            switch (answer) {
                case 1:
                    anw.right = 1;
                    break;
                case 0:
                    anw.littleRight = 1;
                    break;
                case -1:
                    anw.mistake = 1;
                    break;
            }
            try {
                result = await this.ctx.model.answer.update({
                    studentId: s_id
                }, {
                    $inc: anw
                });
                return result;
            } catch (error) {
                error.status = 403;
                throw error;
            }
        }
    }
    return Answer;
}