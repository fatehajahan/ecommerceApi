const uploadImage = require("../middleware/cloudinary")
const categorySchema = require("../models/categorySchema")
const productSchema = require("../models/productSchema")

async function productCtrl(req, res) {
    try {
        const { name, description, price, fragrance, image, category, subCategory, discount } = req.body
        const foundCategory = await categorySchema.findById(category)
        console.log("Incoming data:", req.body)
        // const imgPath = req.file.path
        // const imgUrl = await uploadImage(imgPath)

        if (!name || !description || !price || !fragrance || !foundCategory) {
            return res.json({ message: "All fields are required" })
        }
        const product = new productSchema({
            name, description, price, fragrance,
            //  image: imgUrl.secure_url, 
            subCategory, category: foundCategory.categoryName, discount
        })
        await product.save()
        await categorySchema.findOneAndUpdate(
            { categoryName: category },
            {
                $push: { product: product.name }
            },
            { new: true }
        )
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