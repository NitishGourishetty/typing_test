import mongoose from "mongoose";

const textSchema = mongoose.Schema({
    title: String,
    body: String,
    author: String,
});

const TextModel = mongoose.model('TextModel', textSchema);

export default TextModel;