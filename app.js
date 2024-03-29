const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Successful..."))
  .catch((err) => console.log(err));

// What is schema?
// A mongoose schema defines the structure of the document, default values, validators, etc.

// defining schema
const playListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // uppercase: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  ctype: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["frontend", "backend", "database"],
  },
  videos: Number,
  author: String,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

// Use Pascal Case(Capital) for collection creation
const Playslist = new mongoose.model("Playlist", playListSchema);

// Creating/Inserting Document
const createDocument = async () => {
  try {
    const expressPlaylist = new Playslist({
      name: "express",
      ctype: "Backend",
      videos: 20,
      author: "Thapa Technical",
      active: true,
    });

    const result = await Playslist.insertMany([expressPlaylist]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

createDocument();
