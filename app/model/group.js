module.exports = mongoose => {
    let ObjectId = mongoose.Schema.Types.ObjectId;
    var groupSchema = new mongoose.Schema({
        intdex: Number,
        member: String
    });

    return mongoose.model('groups', groupSchema);
}