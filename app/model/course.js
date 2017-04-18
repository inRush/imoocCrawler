module.exports = mongoose => {
    var courseSchema = new mongoose.Schema({
        studentId: String,
        courseId:Number,
        courseName: String,
        completePercent: Number,
        useTime: String,
        chapterId: String,
        chapterTitle: String
    });

    return mongoose.model('courses', courseSchema);
}