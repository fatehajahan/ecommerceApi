const { get } = require("mongoose")
const categorySchema = require("../models/categorySchema")

async function categoryCtrl(req, res) {
    console.log(req.body)
    const { categoryName, categoryDescription } = req.body
    const exsistingCategory = await categorySchema.findOne({ categoryName })
    if (!categoryName || !categoryDescription) {
        return res.status(400).json({ error: "All fields are required", statues: "failed" })
    }
    if (exsistingCategory) {
        return res.status(400).json({ error: "This Category already exists", statues: "failed" })
    }

    const category = new categorySchema({
        categoryName,
        categoryDescription
    })
    category.save()
    res.status(200).json({
        message: "Category created successfully", statues: "success",
        data: category
    })
}

async function getAllCategoryCtrl(req, res) {
    try {
        const allCategory = await categorySchema.find({})
        res.status(200).json({
            message: "get all category",
            statues: "success",
            data: allCategory
        })
    } catch (error) {
        res.status(400).json({ error: "internal server error", statues: "failed" })
    }
}

async function getSingleCategoryCtrl(req, res) {
    // console.log(req.params)
    const { id } = req.params
    const getSingleCategory = await categorySchema.findOne({_id: id })
    // console.log(getSingleCategory)
    res.status(200).json({
        message: "get single category",
        statues: "success",
        data: getSingleCategory
    })
}

module.exports = { categoryCtrl, getAllCategoryCtrl, getSingleCategoryCtrl }