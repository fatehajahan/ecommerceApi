const express = require("express")
const { categoryCtrl, getAllCategoryCtrl, getSingleCategoryCtrl } = require("../../controllers/categoryCtrl")
const route = express.Router()

route.post("/createcategory", categoryCtrl)
route.get("/getallcategory", getAllCategoryCtrl)
route.get("/getallSinglecategory/:id", getSingleCategoryCtrl)

module.exports = route