import mongoose from "mongoose";

//in the future add text to the schema, so users can compare WPM on specific texts
const wpmSchema = mongoose.Schema({
    wpm: {
        type: Number,
        default: "mystery",
    },
    accuracy: {
        type: Number,
    }
});

const WPMModel = mongoose.model('WPMModel', wpmSchema);

export default WPMModel;