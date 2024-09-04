import express from "express";
const app = express();
import countryRoute from "./routes/countryRoute.js";
import cors from "cors";
import dbconnect from "./models/dbconnect.js";
import uploadData from "./uploads/fileupload.js";
import router from "./routes/userRoute.js";
import dotenv from "dotenv";
dotenv.config();

app.use(cors());
dbconnect();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api/country", countryRoute);
app.use("/api/upload", uploadData);
app.use("/api/auth", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
