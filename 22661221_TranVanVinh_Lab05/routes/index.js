const express = require("express");
const router = express.Router();

const subjectRoute = require("./subject.route");
const SubjectModel = require("../models");

// Render home page with subjects list
router.get("/", async (req, res) => {
  try {
    const subjects = await SubjectModel.getSubjects();
    return res.render("index", { subjects: subjects || [] });
  } catch (error) {
    console.error("Error fetching subjects for view:", error);
    return res.render("index", { subjects: [] });
  }
});

// Mount subjects routes
router.use("/subjects", subjectRoute);

module.exports = router;
