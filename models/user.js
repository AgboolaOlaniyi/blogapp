const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String},
  password: { type: String, required:true },
  email: { type: String, required:true, unique: true },
  gender: { type: String, value: ["male", "female"] },
  country: { type: String },
 
});

UserSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  });
  
  UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  };

module.exports = mongoose.model("users", UserSchema);