module.exports = mongoose => {
    var imoocCourseSchema = new mongoose.Schema({
        name:String,
        parentUrl:String,
        courseId:Number
    });

    return mongoose.model('imoocCourses', imoocCourseSchema,'imoocCourses');
}