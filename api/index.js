const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
const User = require("./models/User.js");
const imageDownloader = require("image-downloader")
const path = require('path')
require("dotenv").config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "wegrtsefaewfrglaryguqwgfeukay";

app.use(express.json());
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email,
           id: userDoc._id,
         },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("password not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get('/profile', (req,res)=>{
  const {token} = req.cookies;
  if(token){
    jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
      if(err) throw err;
      const {name,email,_id}=await User.findById(userData.id)
      res.json({name,email,_id})
    })
  }else{
    res.json(null)
  }
})

app.post('/logout', (req,res)=>{
  res.cookie('token', '').json(true)
  
})

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  const dest = path.join(__dirname, 'uploads', newName); // Use path.join for better cross-platform compatibility

  try {
    await imageDownloader.image({
      url: link,
      dest: dest
    });
    res.json({ success: true, filePath: newName }); // Return success response and file path
  } catch (error) {
    console.error('Error downloading the image:', error); // Log the error
    res.status(500).json({ success: false, message: 'Failed to download image' }); // Return error response
  }
});
app.listen(4000);
