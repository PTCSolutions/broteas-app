import * as admin from "firebase-admin";
admin.initializeApp();
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

exports.linkPreview = require("./linkPreview");

exports.newsMetaData = require("./news");
