const Application = require("../models/Application");

const index = (req, res) => {
  res.render("coordinator/index", { title: "Coordinator Home page" });
};

const getStudentList = async (req, res) => {
  const page = req.query.page || 0;
  const applicationsPerPage = 10;
  const filter = req.query.filter || "approved";
  const department = "cs";

  try {
    const applicationStatus = await Application.find({
      hodApproval: filter,
      branch: department,
    })
      .sort({ timestamps: -1 })
      .skip(page * applicationsPerPage)
      .limit(applicationsPerPage);

    console.log(applicationStatus);
    res.render("coordinator/applications", {
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
    res.render("coordinator/application", {
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
      { $set: { coordiantorApproval: "approved" } }
    );
    res.redirect("/coordinator/applications");
  } catch (err) {
    console.log(err);
  }
};
const rejectStudent = async (req, res) => {
  const id = String(req.params.id);
  try {
    const application = await Application.updateOne(
      { _id: id },
      { $set: { coordiantorApproval: "rejected" } }
    );
    res.redirect("/coordinator/applications");
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
