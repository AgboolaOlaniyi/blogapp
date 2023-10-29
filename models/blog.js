const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const blogSchema = new Schema({
  title: { type: String, required: true, unique: true},
  description: { type: String},
  author: { type: String},
  state: { type: String, value: [ "draft", "published"], default:"draft"},
  body: {type: String, required: true},
  read_count:{ type: String},
  reading_time: { type: String},
  tag: { type: String},  
  user_id:[{type:Schema.Types.ObjectId, ref:"users"}],
  drafted_time: {type: Date }

});
 
module.exports = mongoose.model("Blogs", blogSchema);