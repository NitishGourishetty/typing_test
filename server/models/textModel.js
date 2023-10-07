import mongoose from "mongoose";

const textSchema = mongoose.Schema({
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

const TextModel = mongoose.model('TextModel', textSchema);

export default TextModel;