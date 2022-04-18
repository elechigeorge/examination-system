import mongoose from "mongoose";
import timestampsPlugin from "mongoose-timestamp";

const questionSchema = new mongoose.Schema({
  paper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paper",
  },
  question: {
    type: String,
  },
  answer: {
    type: String,
    default: "option_one",
  },
  options: {
    option_one: String,
    option_two: String,
    option_three: String,
  },
});

questionSchema.plugin(timestampsPlugin);

const Question = mongoose.model("Question", questionSchema);

export default Question;
