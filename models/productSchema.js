const mongoose = require("mongoose")
const { Schema } = mongoose

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    flavour: {
        type: String
    },
    image: {
        type: String
    },
    category: {
        // type: Schema.Types.ObjectId,
        type: String,
        ref: "CategoryList",
        required: true
    },
    subCategory: {
        // type: Schema.Types.ObjectId,
        type: String,
        ref: "SubcategoryList",
    },
    discount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)