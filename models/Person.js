const mongoose = require("mongoose");
const schema = mongoose.Schema;

const PersonSchema = new schema({
  name: {
    type: String,
  },
  favouriteFoods: [{
    type: String,
  }],
  age: {
    type: Number,
  },
});
module.exports = Person = mongoose.model("persons", PersonSchema);
