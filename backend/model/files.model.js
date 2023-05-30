import mongoose from "mongoose";

const filesShema = mongoose.Schema({
    _id:String,
    File:String
});
export default mongoose.model('files',filesShema)