module.exports = app => {
    class ImoocCourse extends app.Service {
        async getById(i_id) {
            let imoocCourse = await this.ctx.model.imoocCourse.findOne({
                _id: i_id
            });
            return imoocCourse;
        }
        async getAll(){
            let courses = await this.ctx.model.imoocCourse.find();
            return courses;
        }
    }
    return ImoocCourse;
}