const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const cors = require("cors");

app.use(cors());

const PORT = 3000;

mongoose.connect(
  "mongodb+srv://AshishKaji:KwNq2fLChaQXL5Tq@cluster0.2mklov9.mongodb.net/dataStore",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
