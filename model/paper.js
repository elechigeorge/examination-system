import mongoose from "mongoose";
import timestampsPlugin from "mongoose-timestamp";

const paperSchema = new mongoose.Schema({
    title: String,
    code: String,
    department: String,
    slug: String
});


paperSchema.plugin(timestampsPlugin);

const Paper = mongoose.model("Paper", paperSchema);


export default Paper;