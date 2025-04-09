const categorySchema = require("../models/categorySchema")
const subCategorySchema = require("../models/subCategorySchema")

async function subCategoryCtrl(req, res) {
    const { subCategoryName, subCategoryDescription, category } = req.body
    const foundCategory = await categorySchema.findOne({ categoryName: category })
    console.log(foundCategory._id)

    if (!foundCategory) {
        return res.status(400).json({ error: "This category does not exist", statues: "failed" })
    }
    const subCategory = new subCategorySchema({
        subCategoryName,
        subCategoryDescription,
        category: foundCategory._id
    })
    subCategory.save();
    console.log(foundCategory.subCategory.push(subCategory._id))
    foundCategory.subCategory.push(subCategory._id)
    foundCategory.save()

    res.status(200).json({
        message: "Subcategory created successfully done",
        statues: "success",
        data: subCategory
    })
}
module.exports = subCategoryCtrl 