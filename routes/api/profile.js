const express = require("express");
const router = new express.Router();
const Profile = require("../../modal/profiles");
const User = require("../../modal/user");
const auth = require("../../middleware/auth");
const axios = require("axios");
const config = require("config");
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
    profileFields.socials = {};
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
    if (profiles.length == 0) {
      return res.status(400).send("No Profiles Found");
    }
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

    res.send({
      msg: "User Removed"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("company", "Company is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
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
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({
        user: req.user.id
      });

      profile.experiences.unshift(newExp);
      await profile.save();
      res.send(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/experience/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });
    if (profile.experiences.length === 0) {
      return res.status(400).send({
        msg: "No experience found"
      });
    }
    const newProfileExperience = profile.experiences.filter(experience => {
      return experience.id !== req.params.id;
    });
    profile.experiences = newProfileExperience;
    await profile.save();

    res.send(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required")
        .not()
        .isEmpty(),
      check("degree", "Degree is required")
        .not()
        .isEmpty(),
      check("major", "Major is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
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

    const { school, degree, major, from, to, current, description } = req.body;

    const newExp = {
      school,
      degree,
      major,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({
        user: req.user.id
      });

      profile.education.unshift(newExp);
      await profile.save();
      res.send(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/education/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });
    if (profile.education.length === 0) {
      return res.status(400).send({
        msg: "No education found"
      });
    }
    const newProfileEducation = profile.education.filter(ed => {
      return ed.id !== req.params.id;
    });
    profile.education = newProfileEducation;
    await profile.save();

    res.send(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/github/:username", async (req, res) => {
  try {
    const repos = await axios.get(
      `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "clientID"
      )}&client_secret=${config.get("clientSecret")}`
    );

    if (repos.data.length === 0) {
      return res.status(404).send({
        msg: "Github Acc Not Found"
      });
    }
    res.send(repos.data);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
