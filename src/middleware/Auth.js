const jwt = require("jsonwebtoken");
const Faculty = require("../models/Faculty");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

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

        if (faculty.role === "advisor") res.redirect("/admin");
        else if (faculty.role === "hod") res.redirect("/hod");
        else if (faculty.role === "coordinator") res.redirect("/coordinator");
        else if (faculty.role === "admin") res.redirect("/admin");
        // next();
      }
    });
  } else {
    res.locals.faculty = null;
    next();
  }
};

const checkAdvisor = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.secret, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/403");
      } else {
        console.log(decodedToken);
        let faculty = await Faculty.findById(decodedToken);

        if (faculty.role === "advisor") next();
        else res.redirect("/403");
      }
    });
  } else {
    res.redirect("/faculty/signin");
  }
  next();
};
const checkHod = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.secret, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/403");
      } else {
        console.log(decodedToken);
        let faculty = await Faculty.findById(decodedToken);

        if (faculty.role === "hod") next();
        else res.redirect("/403");
      }
    });
  } else {
    res.redirect("/faculty/signin");
  }
  next();
};
const checkCoordinator = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.secret, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/403");
      } else {
        console.log(decodedToken);
        let faculty = await Faculty.findById(decodedToken);

        if (faculty.role === "coordinator") next();
        else res.redirect("/403");
      }
    });
  } else {
    res.redirect("/faculty/signin");
  }
  next();
};
const checkAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.secret, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/403");
      } else {
        console.log(decodedToken);
        let faculty = await Faculty.findById(decodedToken);

        if (faculty.role === "admin") next();
        else res.redirect("/403");
      }
    });
  } else {
    res.redirect("/faculty/signin");
  }
  next();
};

module.exports = {
  requireAuth,
  checkFaculty,
  checkAdvisor,
  checkAdmin,
  checkHod,
  checkCoordinator,
};
