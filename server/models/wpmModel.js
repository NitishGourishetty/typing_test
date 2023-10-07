import mongoose from "mongoose";

const wpmSchema = mongoose.Schema({
    title: {
        type: String,
        default: "mystery"
    },
    text: {
        type: String,
        //required: true
    },
    author: {
        type: String,
        default: "anonymous"
    }
});

const WPMModel = mongoose.model('TextModel', textSchema);

export default WPMModel;