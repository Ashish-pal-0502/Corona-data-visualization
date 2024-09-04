import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
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
const User = mongoose.model("Country", countrySchema);

export default User;
