const Faculty = require("../models/Faculty");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  console.log(err.message, err.code);

  let errors = { email: "", password: "" };

  //incorrect email

  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }

  //incorrect password
  if (err.message === "incorrect password") {
    errors.password = "that password is incorrect";
  }
  //duplicate error

  if (err.code === 11000) {
    errors.email = " that email is already registered";
    return errors;
  }
  //validating errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 3 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: maxAge,
  });
};

const facultySigninGet = (req, res) => {
  res.render("auth/signin", { title: "Signin" });
};

const facultySigninPost = async (req, res) => {
  const { employeeNumber, password } = req.body;

  try {
    const faculty = await Faculty.login(employeeNumber, password);
    const token = createToken(faculty._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ faculty: faculty._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const facultyLogoutGet = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });

  res.redirect("/");
};

module.exports = {
  facultySigninGet,
  facultySigninPost,
  facultyLogoutGet,
};
