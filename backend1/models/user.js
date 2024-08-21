const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  country: String,
  confirmed: Number,
  deaths: Number,
  recovered: Number,
  active: Number,
  newCases: Number,
  newDeaths: Number,
  newRecords: Number,
  deathsPerHundred: Number,
  recoverPerHundred: Number,
  oneweekChange: Number,
  oneWeekPercentageIncrease: Number,
  whoRegion: String,
});

module.exports = mongoose.model("User", userSchema);
