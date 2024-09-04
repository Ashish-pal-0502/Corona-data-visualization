import express from "express";
import User from "../models/country.js";
const router = express.Router();

// Route to get paginated users as JSON
router.get("/paginatedUsers", async (req, res) => {
  try {
    let limit = Number(req.query.limit) || 10;
    let page = Number(req.query.page) || 1;
    const allData = await User.find({});

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

// Search data based on country
router.get("/search/:key", async (req, res) => {
  try {
    let data = await User.find({
      $or: [{ country: { $regex: req.params.key, $options: "i" } }],
    });
    if (data) {
      res.json(data); // Return the matched document as a JSON response
    } else {
      res.status(404).json({ message: "Country not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    console.log(error);
  }
});

// Search route
// router.get("/search", async (req, res) => {
//   const { query } = req.query;

//   try {
//     const results = await User.find({
//       $or: [
//         { country: { $regex: query, $options: "i" } },
//         { deaths: { $regex: query, $options: "i" } },
//       ],
//     });
//     res.json(results);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//     console.log(error);
//   }
// });

// Route to get all users
router.get("/all", async (req, res) => {
  const allData = await User.find({});
  const total = await User.countDocuments([]);
  res.json({ data: allData, total: total });
});

export default router;
