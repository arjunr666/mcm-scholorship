const multer = require("multer");
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const Application = require("../models/Application");
const Status = require("../models/Status");

const generateUniqueFileName = (req, res) => {};

const getApplicationForm = (req, res) => {};

const postApplicationForm = async (req, res) => {};

const printApplication = (req, res) => {};

module.exports = { getApplicationForm, postApplicationForm, printApplication };
