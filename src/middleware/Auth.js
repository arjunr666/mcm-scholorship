const jwt = require("jsonwebtoken");
const Faculty = require("../models/Faculty");

//check for login
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;


  console.log(process.env.secret);
  
  if (token) {
    jwt.verify(token, process.env.secret, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/faculty/signin");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/faculty/signin");
  }

  next();
};

//check for current user

const checkFaculty = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.secret, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.locals.faculty = null;
        next();
      } else {
        console.log(decodedToken);
        let faculty = await Faculty.findById(decodedToken.id);
        res.locals.faculty = faculty;
        next();
      }
    });
  } else {
    res.locals.faculty = null;
    next();
  }
};

module.exports = { requireAuth, checkFaculty };
