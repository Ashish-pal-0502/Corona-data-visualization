import express from "express";
import multer from "multer";
import csvtojson from "csvtojson";
import xlsx from "xlsx";
import User from "../models/country.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

const uploadData = router.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      const filePath = req.file.path;
      const fileExtension = req.file.originalname.split(".").pop();

      let jsonArray;

      if (fileExtension === "csv") {
        jsonArray = await csvtojson().fromFile(filePath);
      } else if (fileExtension === "xlsx") {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        jsonArray = xlsx.utils.sheet_to_json(worksheet);
      } else {
        return res.status(400).json({ message: "Unsupported file format" });
      }

      for (const record of jsonArray) {
        const {
          country,
          confirmed,
          deaths,
          recovered,
          active,
          newCases,
          newDeaths,
          newRecords,
          deathsPerHundred,
          recoverPerHundred,
          oneweekChange,
          oneWeekPercentageIncrease,
          whoRegion,
        } = record;
        const user = new User({
          country,
          confirmed,
          deaths,
          recovered,
          active,
          newCases,
          newDeaths,
          newRecords,
          deathsPerHundred,
          recoverPerHundred,
          oneweekChange,
          oneWeekPercentageIncrease,
          whoRegion,
        });
        await user.save();
      }

      res.status(200).json({ message: "Your File data saved to database" });
      res.json(jsonArray);
      console.log("Data saved successfully");
    } catch (error) {
      // res.status(500).json({ message: error.message });
    }
  }
);

export default uploadData;
