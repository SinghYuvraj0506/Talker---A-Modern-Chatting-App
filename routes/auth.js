const express = require("express");
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const fetchuser = require("../middleware/fetchUser");
const Friends = require("../models/Friends.js");
const Message = require("../models/Message.js");

const router = express.Router();
const JWT_SECRET = "YuvrajSinghappofmychat";

// ROUTE 1 :- we create user at /create user end point.
router.post(
  "/createuser",
  [
    body("email", "Enter a valid Email").isEmail(),
    body(
      "password",
      "Enter a password with length more than 5 Characters"
    ).isLength({ min: 5 }),
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // if there are some errors then the response will be the errors itself
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .send({ success, already: true, error: "User already exists" });
      }

      // we are hasing and salting the entered password
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        //profile: req.body.profile,
        email: req.body.email,
        password: secpass,
        age: req.body.age,
        //mobile: req.body.mobile,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({
        success: success,
        authtoken: authtoken,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(400).send("Some error occured");
    }
  }
);

// ROUTE 2 :- we loggin user at /loginuser end point.
router.post(
  "/loginuser",
  [
    body("email", "Enter a valid Email").isEmail(),
    body(
      "password",
      "Enter a password with length more than 5 Characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // if there are some errors then the response will be the errors itself
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .send({ success, error: "Please Login with correct credentials" });
      }
      const passwordcompare = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordcompare) {
        return res
          .status(400)
          .json({ success, error: "Please Login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;

      res.json({
        success: success,
        authtoken: authtoken,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(400).send("Some error occured");
    }
  }
);

// ROUTE 3 :- we get any user details from authtoken at /getuser end point.
router.get("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    let user = await User.findById(userId).select("-password");
    res.json({ success: true, user });
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ success: false, error: "Some Error Occured" });
  }
});

// ROUTE 4 :- we get any user details from id at /getuserdetail end point.
router.post("/getuserdetail", async (req, res) => {
  try {
    const userId = req.body.user_id;
    let user = await User.findById(userId).select("-password");
    if (user) {
      res.json({ success: true, user });
    } else {
      res.send("user not found");
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ success: false, error: "Some Error Occured" });
  }
});

// Route 5 :- we get profile details of the user fr the profile popup
router.get("/getdetailsforprofile", fetchUser, async (req, res) => {
  try {
    let friends = await Friends.find({ user_id: req.user.id }).select({
      friend_id: 1,
    });
    let messages = await Message.find({ sender_id: req.user.id }).select({
      _id: 1,
    });
    let favorites = await Friends.find({
      friend_id: req.user.id,
      isFavorite: true,
    }).select({ friend_id: 1 });
    if (!friends) {
      friends = [];
    }
    if (!messages) {
      messages = [];
    }

    return res.json({
      success: true,
      data: {
        friends: friends.length,
        messages: messages.length,
        favorites: favorites.length,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ success: false, error: "Some Error Occured" });
  }
});

// Route 6 :- get search result from the search bar -----------------------------
router.get("/searchForFriends", fetchUser, async (req, res) => {
  try {
    let friends = [];
    let users = await User.find({ email: { $regex: req.query.param + "/*" } });
    let list = await Friends.find({ user_id: req.user.id }).select({
      friend_id: 1,
    });
    list.forEach((element) => {
      friends.push(element?.friend_id);
    });
    

    return res.json({ success: true, users : users.filter((e)=>{return e?._id.toString() !== req.user.id }), friends });
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ success: false, error: "Some Error Occured" });
  }
});

module.exports = router;
