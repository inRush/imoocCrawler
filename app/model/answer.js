module.exports = mongoose => {
    var answerSchema = new mongoose.Schema({
        studentId: String,
        right: Number,
        littleRight: Number,
        mistake: Number,
    });

    return mongoose.model('answers', answerSchema);
}