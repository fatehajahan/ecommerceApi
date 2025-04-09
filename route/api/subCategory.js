const express = require("express")
const subCategoryCtrl = require("../../controllers/subCategoryCtrl")
const route = express.Router()

route.post("/createsubcategory", subCategoryCtrl)
module.exports = route