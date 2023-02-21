const express = require("express");
const User = require("../models/User.js");
const Friend = require("../models/Friends.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const router = express.Router();
const JWT_SECRET = "YuvrajSinghappofmychat";

// ROUTE 1 :- create a friend list for each login user
router.post("/addtofriendlist", fetchUser, async (req, res) => {
  let success = false;
  try {
    let { friend_id } = req.body;
    let list = await Friend.findOne({ user_id: req.user.id, friend_id });

    if (list) {
      return res.json({
        success: success,
        already: true,
      });
    }

    let list2 = await Friend.create({
      user_id: req.user.id,
      friend_id,
    });

    success = true;
    return res.json({
      success: success,
      list: list2,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success, error: "Some error occured" });
  }
});

// ROUTE 2 :- fetching all the members of friend list
router.get("/getfriendlist", fetchUser, async (req, res) => {
  let success = false;
  try {
    let list = await Friend.find({ user_id: req.user.id }).populate({
      path: "friend_id",
      select: ["name", "profile", "tagline", "email","LastVisited"],
    });

    if (!list) {
      success = true;
      return res.json({
        success: success,
        list: [],
      });
    }

    success = true;
    return res.json({
      success: success,
      list,
    });
  } catch (error) {
    return res.status(400).json({ success, error: "Some error occured" });
  }
});

// ROUTE 2 :- fetching all the members of friend list
router.get("/changeFavoriteState/:id", fetchUser, async (req, res) => {
  let success = false;
  try {
    let list = await Friend.find({
      user_id: req.user.id,
      friend_id: req.params.id,
    });

    (newList = await Friend.findByIdAndUpdate(list[0]._id, {
      isFavorite: !list[0]?.isFavorite ,
    })),
    { new: true };

    success = true;
    return res.json({
      success: success,
      list: newList,
    });
    
  } catch (error) {
    return res.status(400).json({ success, error: "Some error occured" });
  }
});

//

module.exports = router;
