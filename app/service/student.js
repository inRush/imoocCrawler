module.exports = app => {
    class Student extends app.Service {
        async getById(s_id) {
            let student = await this.ctx.model.student.findOne({
                _id: params.id
            });
            return student;
        }
        async getAll() {
            let students = await this.ctx.model.student.find();
            return students;
        }
        async getByGroup(g) {
            let students = await this.ctx.model.student.find({
                group: g
            });
            return students;
        }
        async getByNameReg(name) {
            let searchName = new RegExp(name);
            let students = await this.ctx.model.student.find({
                name: searchName
            });
            return students;
        }
        async getByImoocId(i_id) {
            let students = await this.ctx.model.student.findOne({
                imoocId: i_id
            });
            return students;
        }


    }
    return Student;
}