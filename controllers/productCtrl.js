const productSchema = require("../models/productSchema")
const subCategorySchema = require("../models/subCategorySchema")

async function productCtrl(req, res) {
    // console.log('firstproduct')
    const { productName, price, subCategory } = req.body
    const exsistingProduct = await productSchema.findOne({ productName })
    const foundSubCategory = await subCategorySchema.findOne({ subCategoryName: subCategory })
    console.log(foundSubCategory)

    if (!productName || !price) {
        return res.json({ message: "All fields are required" })
    }
    if (exsistingProduct) {
        return res.json({ error: "This Product already exists" })
    }

    const product = new productSchema({
        productName,
        price,
        subCategory: foundSubCategory.subCategoryName
    })
    product.save()

    await subCategorySchema.findOneAndUpdate(
        { subCategoryName: subCategory },
        {
            $push: { products: product.productName }
        },
        { new: true }
    )
    res.status(200).json({
        message: "new product created successfully", statues: "success",
        data: product
    })
}

module.exports = productCtrl