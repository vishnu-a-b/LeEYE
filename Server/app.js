const express = require("express");
const collection = require("./mongo");
const multer = require("multer");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());
app.get("/", cors(), (req, res) => {});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: "./images",
  filename: function (req, file, cb) {
    cb(null, req.body.name + path.extname(file.originalname));
  },
});

// Multer upload instance
const upload = multer({ storage });

app.get("/user/:name", async (req, res) => {
    const name = req.params.name;
  
    try {
      const user = await collection.findOne({ name: name });
  
      if (user) {
        const userData = {
          name: user.name,
          password: user.password,
          address: user.address,
          imageUrl: `http://localhost:8000/images/${user.image}`,
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
  const image = req.file.filename;
  const data = {
    name: name,
    password: password,
    image: image,
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
  const image = req.file ? req.file.filename : null;

  try {
    const user = await collection.findOne({ name: name });
    if (!user) {
      return res.json("User not found");
    }

    const updatedData = {
      name: name || user.name,
      password: password || user.password,
      image: image || user.image,
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
