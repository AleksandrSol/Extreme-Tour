const mongoose = require("mongoose");

// Определение схемы для коллекции movies
const movieSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  password: String,
});

// Создание модели для коллекции movies
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie; // Экспорт модели для использования в других файлах
