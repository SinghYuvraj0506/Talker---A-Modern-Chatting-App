const express = require("express");
const fetchuser = require("../middleware/fetchUser.js");
const User = require("../models/User.js");
const Message = require("../models/Message.js");
const { body, validationResult } = require("express-validator");

const router = express.Router();


// ROUTE 1 :- we will fetch all messages between two people at /fetchallmessages endpoint

router.post(
  "/fetchallmessages",
  [body("reciever_id", "Enter a Reciever_id").isLength({ min: 3 })],
  fetchuser,
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // if there are some errors then the response will be the errors itself
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }


    try {
      const messages = [];
      let note1 = await Message.find({
        $or: [
          { sender_id: req.body.reciever_id, reciever_id: req.user.id },
          { reciever_id: req.body.reciever_id, sender_id: req.user.id },
        ],
      }).sort({ date: 1 });

      const data = messages.concat(note1);

      res.json(data);
    } catch (error) {
      console.error(error.message);
      return res.status(400).send("Some error occured");
    }
  }
);

// ROUTE 2 :- we will add messages between two people at /addmessage endpoint

router.post(
  "/addmessage",
  [
    body("reciever_id", "Enter a Reciever_id").isLength({ min: 3 }),
    body("message", "Enter a message").isLength({ min: 1 }),
  ],
  fetchuser,
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // if there are some errors then the response will be the errors itself
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      const message = await Message.create({
        reciever_id: req.body.reciever_id,
        sender_id: req.user.id,
        message: req.body.message,
      });

      res.json(message);
    } catch (error) {
      console.error(error.message);
      return res.status(400).send("Some error occured");
    }
  }
);

// ROUTE 3: updating message using /updatemessage endpoint
router.put(
  "/updatemessage/:id",
  [body("message", "Enter a message").isLength({ min: 1 })],
  fetchuser,
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // if there are some errors then the response will be the errors itself
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      const { message } = req.body;
      const newmessage = {}; // first we are taking the user input and storing it
      if (message) {
        newmessage.message = message;
      }
      let note = await Message.findById(req.params.id);

      if (!note) {
        // checking iff the notes with such id is present or nor in the database
        return res.status(401).send("Note not found");
      }

      if (note.sender_id.toString() !== req.user.id) {
        // checking if the owner of the note is the same person wth the authentification token
        return res.status(401).send("Not Allowed");
      }

      note = await Message.findByIdAndUpdate(
        req.params.id,
        { $set: newmessage },
        { new: true }
      ); //updating the notes

      res.json(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

// ROUTE 4: deleting messages using /deletemessage endpoint
router.delete("/deletemessage/:id", fetchuser, async (req, res) => {
  let note = await Message.findById(req.params.id);

  if (!note) {
    // checking iff the notes with such id is present or nor in the database
    return res.status(401).json({success:false,error:"Note doesnt exist"});
  }


  if (note.sender_id.toString() !== req.user.id) {
    // checking if the owner of the note is the same person wth the authentification token
    return res.status(401).json({success:false,error:"Not Allowed"});
  }

  try {
    note = await Message.findByIdAndDelete(req.params.id); //deleting the notes
    res.json({ success:true, message: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({success:false});
  }
});

// ROUTE 5: forwarding messages using /forwardmessage endpoint

router.put(
  "/forwardmessage/:id",
  [body("reciever_id", "Enter a Reciever_id").isLength({ min: 3 })],
  fetchuser,
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // if there are some errors then the response will be the errors itself
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let note = await Message.findById(req.params.id);

      if (!note) {
        // checking iff the notes with such id is present or nor in the database
        return res.status(401).send("Note not found");
      }

      if (note.sender_id !== req.user.id) {
        // checking if the owner of the note is the same person wth the authentification token
        return res.status(401).send("Not Allowed");
      }

      let message = await Message.create({
        sender_id:req.user.id,
        reciever_id:req.body.reciever_id,
        message:note.message
      })

      res.json(message)

    } catch (error) {
      console.error(error.message);
      res.status(400).send("Some error occured");
    }
  }
);

// ROUTE 6: getting message details using /getmessage endpoint
router.get("/getmessage/:id", fetchuser, async (req, res) => {
  let note = await Message.findById(req.params.id);

  if (!note) {
    // checking iff the notes with such id is present or nor in the database
    return res.status(401).send("Note not found");
  }

  //if (note.sender_id !== req.user.id) {
  //  // checking if the owner of the note is the same person wth the authentification token
  //  return res.status(401).send("Not Allowed");
  //}

  try {
    res.json({ Success: "got the message", message: note.message });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
