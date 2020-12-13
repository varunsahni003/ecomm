const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  name: { type: String, required: true },
  uniqueId: { type: String, required: true },
  answers: { type: Array, required: true },
  reviewData : { type: Array }
});

module.exports = mongoose.model("Quizes", quizSchema);
