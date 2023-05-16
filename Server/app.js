const express = require("express");
const collection = require("./mongo");
const multer = require("multer");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Multer configuration
const upload = multer();

app.get("/", cors(), (req, res) => {
  // Handle root route request
});

app.get("/user/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const user = await collection.findOne({ name: name });

    if (user) {
      const userData = {
        name: user.name,
        password: user.password,
        address: user.address,
        imageUrl: user.image, // Assuming image is stored as base64 string
      };

      res.json(userData);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/", async (req, res) => {
  const { name, password } = req.body;

  try {
    const check = await collection.findOne({ name: name });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/signup", upload.single("image"), async (req, res) => {
  const { name, password, address } = req.body;
  const image = req.file; // Assuming image is uploaded as a file

  // Read the uploaded image file as base64
  const base64Image = image.buffer.toString("base64");

  const data = {
    name: name,
    password: password,
    image: base64Image,
    address: address,
  };

  try {
    const check = await collection.findOne({ name: name });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/update", upload.single("image"), async (req, res) => {
  const { name, password, address } = req.body;
  const image = req.file; // Assuming image is uploaded as a file

  // Check if an image file is uploaded
  let updatedImage = null;
  if (image) {
    // Read the uploaded image file as base64
    updatedImage = image.buffer.toString("base64");
  }

  try {
    const user = await collection.findOne({ name: name });
    if (!user) {
      return res.json("User not found");
    }

    const updatedData = {
      name: name || user.name,
      password: password || user.password,
      image: updatedImage || user.image,
      address: address || user.address,
    };

    await collection.updateOne({ name: name }, { $set: updatedData });
    res.json("Successfully updated");
  } catch (e) {
    console.log(e);
    res.json("Failed to update");
  }
});

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
