const mongoose = require("mongoose")
const { Schema } = mongoose

const productSchema = new Schema({
    productName: {
        type: String,
        require: true,
        trim: true
    },
    price: {
        type: String,
        require: true,
    },
    subCategory: [{
        // type: Schema.Types.ObjectId,(eta tokhn use korte hobe jokhn _id array te dibo.)
        type: String,
        ref: "SubcategoryList",
        require: true
    }],
})

module.exports = mongoose.model("Product", productSchema)