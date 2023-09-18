const Application = require("../models/Application");

const index = (req, res) => {
  res.render("hod/index", { title: "HOD Home page" });
};

const getStudentList = async (req, res) => {
  const page = req.query.page || 0;
  const applicationsPerPage = 10;
  const filter = req.query.filter || "approved";
  const department = "cs";

  try {
    const applicationStatus = await Application.find({
      advisorApproval: filter,
      branch: department,
    })
      .sort({ timestamps: -1 })
      .skip(page * applicationsPerPage)
      .limit(applicationsPerPage);

    console.log(applicationStatus);
    res.render("hod/applications", {
      title: "Applications",
      applications: applicationStatus,
    });
  } catch (err) {
    console.log(err);
  }
};

const showStudentDetail = async (req, res) => {
  const id = String(req.params.id);

  try {
    const application = await Application.findById(id);
    console.log(application);
    res.render("hod/application", {
      title: "Application deatils",
      application: application,
    });
  } catch (err) {
    console.log(err);
  }
};
const approveStudent = async (req, res) => {
  const id = String(req.params.id);
  try {
    const application = await Application.updateOne(
      { _id: id },
      { $set: { hodApproval: "approved" } }
    );
    res.redirect("/hod/applications");
  } catch (err) {
    console.log(err);
  }
};
const rejectStudent = async (req, res) => {
  const id = String(req.params.id);
  try {
    const application = await Application.updateOne(
      { _id: id },
      { $set: { hodApproval: "rejected" } }
    );
    res.redirect("/hod/applications");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  index,
  getStudentList,
  showStudentDetail,
  approveStudent,
  rejectStudent,
};
