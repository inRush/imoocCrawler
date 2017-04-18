// var mongoosePages = require('mongoose-pages');
module.exports = mongoose => {
    var studentSchema = new mongoose.Schema({
        studentId: String,
        name: String,
        picture: String,
        imoocId: String,
        group: String
    });
    // mongoosePages.skip(studentSchema);

    return mongoose.model('students', studentSchema);
}