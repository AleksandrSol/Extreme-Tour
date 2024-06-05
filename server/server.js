const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
// const Movie = require("./models/movies"); // Импорт модели

const connectionString =
  "mongodb+srv://sanya:79_SmJJiGuVs%23_d@cluster0.fjkkmek.mongodb.net/ExtremeAdventuresDB";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const Tour = mongoose.model("adventures", {});

app.get("/tours", async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/search", async (req, res) => {
  try {
    const searchText = req.query.text;
    const tours = await Tour.find({
      name: { $regex: searchText, $options: "i" },
    });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
