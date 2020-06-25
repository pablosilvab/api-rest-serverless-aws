const mongoose = require("mongoose");
const CharacterSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});
module.exports = mongoose.model("Character", CharacterSchema);
