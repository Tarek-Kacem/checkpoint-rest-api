const mongoose = require("mongoose");
const express = require("express");
const app = express();
const user = require("./models/user");


app.use(express.json());
require("dotenv").config({ path: "./config.env" });
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  console.log("connect DB")
);

user.create({ name: "nour", age: 28, favoriteFoods: ["soupe", "couscous","burritos"] });
app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/users", (req, res) => {
  user.find((err, data) => {
    res.json(data);
  });
});

app.put("/:id", (req, res) => {
  user.findById(req.params.id, (err, data) => {
    console.log(req.params.id);
    data.favoriteFoods.push(req.body.food);
    data.save().then((user) => {
      console.log(user);
      res.send(user);
    });
  });
});

app.post("/user", (req, res) => {
  const newUser = new user(req.body);
  newUser.save().then(res.json(req.body));
});

app.listen("5000", () => console.log("server conect"));