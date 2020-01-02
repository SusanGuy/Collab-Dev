const express = require("express");
const router = new express.Router();
const Profile = require("../../modal/Profile");
const User = require("../../modal/User");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({
        msg: "No Profile found"
      });
    }
    res.send(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required")
        .not()
        .isEmpty(),
      check("skills", "Skills is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => {
        return skill.trim();
      });
    }
    profileFields.social = {};
    if (youtube) profileFields.socials.youtube = youtube;
    if (twitter) profileFields.socials.twitter = twitter;
    if (facebook) profileFields.socials.facebook = facebook;
    if (linkedin) profileFields.socials.linkedin = linkedin;
    if (instagram) profileFields.socials.instagram = instagram;

    try {
      let profile = await Profile.findOne({
        user: req.user.id
      });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          {
            user: req.user.id
          },
          {
            $set: profileFields
          },
          {
            new: true
          }
        );
        return res.json(profile);
      }
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.send(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.id
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).send({
        msg: "No Profile Found"
      });
    }
    res.send(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({
      user: req.user.id
    });

    await User.findByIdAndRemove({
      _id: req.user.id
    });

    res.json({
      msg: "User Removed"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
