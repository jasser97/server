const express = require("express");
const router = express.Router();
const Events = require("../../models/Event");
const { check, validationResult } = require("express-validator");
const auth = require("../../config/auth");
const User = require("../../models/User");
router.post(
  "/",
  auth,
  [
    check("Type_event", "please enter your Type_event").not().isEmpty(),
    check("City", "please enter your City name").not().isEmpty(),
    check("Country", "please enter your Country name").not().isEmpty(),
    check("Zip_code", "please enter your  Zip_code ").not().isEmpty(),
    check("Titre", "please enter Titre").not().isEmpty(),
    check("Description", "please enter Description").not().isEmpty(),
    check("Start_date", "please enter Start_date").not().isEmpty(),
    check("End_date", "please enter End_date").not().isEmpty(),
    check("EventImage", "please enter EventImage").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const {
      Type_event,
      City,
      Country,
      Zip_code,
      Titre,
      Description,
      Start_date,
      EventImage,
      End_date,
    } = req.body;

    event = new Events({
      Type_event,
      City,
      Country,
      Zip_code,
      Description,
      Start_date,
      EventImage,
      End_date,
      Titre,
      User: req.user.id,
    });
    event.save((err) => {
      if (err) {
        if (err.errors.Type_event) {
          res.json({ sucess: false, message: err.errors.Type_event.message });
        } else {
          if (err.errors.City) {
            res.json({ success: false, message: err.errors.City.message });
          } else {
            if (err.errors.Country) {
              res.json({
                success: false,
                message: err.errors.Country.message,
              });
            } else {
              if (err.errors.Zip_code) {
                res.json({
                  success: false,
                  message: err.errors.Zip_code.message,
                });
              } else {
                if (err.errors.Description) {
                  res.json({
                    success: false,
                    message: err.errors.Description.message,
                  });
                } else {
                  if (err.errors.Start_date) {
                    res.json({
                      success: false,
                      message: err.errors.Start_date.message,
                    });
                  } else {
                    if (err.errors.EventImage) {
                      res.json({
                        success: false,
                        message: err.errors.EventImage.message,
                      });
                    } else {
                      if (err.errors.End_date) {
                        res.json({
                          success: false,
                          message: err.errors.End_date.message,
                        });
                      } else {
                        if (err.errors.Titre) {
                          res.json({
                            success: false,
                            message: err.errors.Titre.message,
                          });
                        } else {
                          res.json({
                            success: false,
                            message: "could not save event. Error",
                          });
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        res.json({ success: true, message: "event saved" });
      }
    });
  }
);

//get all events
//protected route
router.get("/", auth, (req, res) => {
  Events.find({ User: req.user.id })
    .then((Events) => res.json(Events))
    .catch((err) => console.log(err.message));
});

router.get("/singleEvent/:id", auth, (req, res) => {
  if (!req.params.id) {
    res.json({ success: false, message: "No event id was provided" });
  } else {
    Events.findById(req.params.id, (err, event) => {
      if (err) {
        res.json({ sucess: false, message: err });
      } else {
        if (!event) {
          res.json({ sucess: false, message: "Event not found. " });
        } else {
          if (event.User.toString() !== req.user.id) {
            res.json({ success: false, message: "not authorized" });
          } else {
            res.json({ event: event });
          }
        }
      }
    });
  }
});

//update event
router.put("/:id", auth, (req, res) => {
  const {
    Type_event,
    City,
    Country,
    Zip_code,
    Titre,
    Description,
    Start_date,
    EventImage,
    End_date,
    Likes,
    DisLikes,
    Sponsor,
  } = req.body;
  let updateEvent = {};

  //build a event object
  if (Type_event) updateEvent.Type_event = Type_event;
  if (City) updateEvent.City = City;
  if (Country) updateEvent.Country = Country;
  if (Zip_code) updateEvent.Zip_code = Zip_code;
  if (Titre) updateEvent.Titre = Titre;
  if (Description) updateEvent.Description = Description;
  if (Start_date) updateEvent.Start_date = Start_date;
  if (EventImage) updateEvent.age = EventImage;
  if (End_date) updateEvent.End_date = End_date;
  if (Likes) updateEvent.Likes = Likes;
  if (DisLikes) updateEvent.DisLikes = DisLikes;
  if (Sponsor) updateEvent.Sponsor = Sponsor;

  Events.findById(req.params.id)
    .then((event) => {
      if (!event) {
        return res.json({ msg: "event not find" });
      } else if (event.User.toString() !== req.user.id) {
        res.json({ msg: "not authorized" });
      } else {
        Events.findByIdAndUpdate(
          req.params.id,
          { $set: updateEvent },
          { useFindAndModify: false },
          (err, data) => {
            res.json({ msg: "event updated" });
          }
        );
      }
    })
    .catch((err) => console.log(err.message));
});

//delete event
//private route
router.delete("/:id", auth, (req, res) => {
  Events.findById(req.params.id)
    .then((event) => {
      if (!event) {
        return res.json({ msg: "event not find" });
      } else if (event.User.toString() !== req.user.id) {
        res.json({ msg: "not authorized" });
      } else {
        Events.findByIdAndDelete(
          req.params.id,

          { useFindAndModify: false },
          (err, data) => {
            res.json({ msg: "event deleted" });
          }
        );
      }
    })
    .catch((err) => console.log(err.message));
});
router.put("/likeEvent/:id", auth, (req, res) => {
  if (!req.body.id) {
    res.json({ success: false, message: "No event id was provided" });
  } else {
    Events.findOne({ _id: req.body.id }, (err, event) => {
      if (err) {
        res.json({ success: false, message: "Invalid event id" });
      } else {
        if (!event) {
          res.json({ success: false, message: "That event was not found  " });
        } else {
          User.findById(req.user.id, (err, user) => {
            if (err) {
              res.json({ success: false, message: "Something went wrong" });
            } else {
              if (!user) {
                res.json({
                  success: false,
                  message: "could not authenticate user.",
                });
              } else {
                if (user._id === req.user.id) {
                  res.json({
                    success: false,
                    message: "cannot like your own post",
                  });
                } else {
                  if (event.likedBy.includes(user.userName)) {
                    res.json({
                      success: false,
                      message: "You already liked this post",
                    });
                  } else {
                    if (event.DisLikedBy.includes(user.userName)) {
                      event.DisLikes--;
                      const arrayIndex = event.DisLikedBy.indexOf(
                        user.userName
                      );
                      event.DisLikedBy.splice(arrayIndex, 1);
                      event.Likes++;
                      event.likedBy.push(user.userName);
                      event.save((err) => {
                        if (err) {
                          res.json({
                            success: false,
                            message: "something went wrong .",
                          });
                        } else {
                          res.json({
                            success: true,
                            message: "event liked",
                          });
                        }
                      });
                    } else {
                      event.Likes++;
                      event.likedBy.push(user.userName);
                      event.save((err) => {
                        if (err) {
                          res.json({
                            success: false,
                            message: "something went wrong .",
                          });
                        } else {
                          res.json({
                            success: true,
                            message: "event liked",
                          });
                        }
                      });
                    }
                  }
                }
              }
            }
          });
        }
      }
    });
  }
});

module.exports = router;
