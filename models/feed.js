const { default: mongoose } = require("mongoose")

const feedModel = mongoose.Schema({
    title: String,
    body: String,
    image: String,
    source: String,
    publisher: String
})

module.exports = mongoose.model('feed', feedModel);

