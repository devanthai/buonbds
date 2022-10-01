const mongoose = require("mongoose")
module.exports = async (mongoUrl) => {
    try {
        await mongoose.connect(mongoUrl, { useNewUrlParser:true }, () => console.log(`Connected to db ${mongoUrl}`));
    }
    catch (ex) { console.log(ex) }
}