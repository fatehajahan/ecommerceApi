const express = require("express")
const productCtrl = require("../../controllers/productCtrl")

const route = express.Router()

route.post("/createproduct" , productCtrl)
// route.post("/createsubcategory", subCategoryCtrl)
module.exports = route