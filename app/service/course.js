module.exports = app => {
    class Course extends app.Service {
        async getByStudentId(s_Id) {
            let course = await this.ctx.model.course.findOne({
                studentId: s_Id
            });
            return course;
        }
        async getByStudentAndId(s_id, c_id) {
            let course = await this.ctx.model.course.findOne({
                studentId: s_id,
                courseId: c_id
            });
            // console.log(course   )
            return course;
        }

        async updateCourse(courses) {
            await this.ctx.model.course.remove({});
            for (let i = 0; i < courses.length; i++) {
                let course = new this.ctx.model.course(courses[i]);
                await course.save();
            }
        }
    }
    return Course;
}