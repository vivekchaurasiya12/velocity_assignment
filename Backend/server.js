const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db"); // MongoDB

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

// MongoDB (Users/Auth)
app.use("/api/users", require("./routes/UserRoutes"));

// MySQL (Books)
app.use("/api/books", require("./routes/bookRoutes"));

app.use(require("./middleware/errorMiddleware").errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
