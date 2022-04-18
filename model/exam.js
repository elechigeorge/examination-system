import mongoose from "mongoose";
import timestampsPlugin from "mongoose-timestamp";

const examSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    paper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Paper"
    },
    result: {
        type: String,
        required: true
    }
});

examSchema.plugin(timestampsPlugin);

const Exam = mongoose.model("Exam", examSchema);


export default Exam;