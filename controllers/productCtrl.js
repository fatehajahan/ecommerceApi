const productSchema = require("../models/productSchema")

async function productCtrl(req, res) {
    try {
        const { name, description, price, flavour, image, category, subCategory } = req.body
        // const exsistingProduct = await  productSchema.findOne({ name })
        console.log(req.body)
        console.log(req.file.filename)

        if (!name || !price || !description || !flavour) {
            return res.json({ message: "All fields are required" })
        }
        const product = new productSchema({
            name, description, price, flavour, image: `http://localhost:3000/api/v1/upload/${req.file.filename}`, category, subCategory
        })
        await product.save()
        res.status(200).json({
            message: "product created successfully", statues: "success",
            data: product
        })
    } catch (error) {
        res.status(400).json({
            message: "product creation failed", statues: "Failed"
        })
    }
}

module.exports = productCtrl