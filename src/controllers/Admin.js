const Faculty = require("../models/Faculty");

const adminIndex = (req, res) => {
  res.render("admin/index", { title: "Admin Home Page" });
};

const registerFacultyGet = (req, res) => {
  res.render("admin/register_facculty", { title: "Faculty registration" });
};

const registerFacultyPost = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    employeeNumber,
    email,
    password,
    phone,
    role,
    department,
  } = req.body;

  try {
    const faculty = await Faculty.create({
      firstName,
      middleName,
      lastName,
      employeeNumber,
      email,
      password,
      phone,
      role,
      department,
    });

    res.status(200).json({ faculty: faculty._id });
  } catch (err) {
    console.log(err);
  }
};

const searchFaculty = async (req, res) => {
  const { name } = req.body;

  try {
    const faculties = Faculty.find({
      $or: [
        { firstName: { $regex: `/^${name}/i` } },
        { middleName: { $regex: `/^${name}/i` } },
        { lastName: { $regex: `/^${name}/i` } },
      ],
    });
    // res.render("",{title:"",faculties:faculties});
  } catch (err) {
    console.log(err);
  }
};

const viewFaculty = async (req, res) => {
  const employeeNumber = String(req.params.empNo);

  try {
    const faculty = await Faculty.find({ employeeNumber });

    // res.render("",{title:"",faculty:faculty});
  } catch (err) {
    console.log(err);
  }
};
const viewFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find({});

    // res.render("",{title:"",faculties:faculties});
  } catch (err) {
    console.log(err);
  }
};
// const resetPassword = (req, res) => {
//   const employeeNumber = String(req.params.empNo);

//   try {
//     const faculty = Faculty.updateOne(
//       { employeeNumber },
//       { $set: { password: "Test@1234#" } }
//     );

//     res.redirect("");
//   } catch (err) {
//     console.log(err);
//   }
// };

module.exports = {
  adminIndex,
  registerFacultyGet,
  registerFacultyPost,
  searchFaculty,
  viewFaculties,
  viewFaculty,

};
