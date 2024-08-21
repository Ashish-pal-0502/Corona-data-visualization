const express = require("express");
const multer = require("multer");
const csvtojson = require("csvtojson");
const xlsx = require("xlsx");
const User = require("../models/user");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
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
      console.log(jsonArray);
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
    res.status(500).json({ message: error.message });
  }
});

// Route to get all users as JSON
router.get("/paginatedUsers", async (req, res) => {
  // console.log(req.params);

  try {
    let limit = Number(req.query.limit) || 10;
    let page = Number(req.query.page) || 1;
    const allData = await User.find({});
    // .limit(limit)
    // .skip((page - 1) * limit);

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};
    results.totalUsers = allData.length;
    results.pageCount = Math.ceil(allData.length / limit);

    if (lastIndex < allData.length) {
      results.next = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
      };
    }

    results.result = allData.slice(startIndex, lastIndex);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/all", async (req, res) => {
  const allData = await User.find({});
  const total = await User.countDocuments([]);
  res.json({ data: allData, total: total });
});

module.exports = router;
