const mongoose = require("mongoose")
const { Schema } = mongoose

const categorySchema = new Schema({
    categoryName: {
        type: String,
        require: true,
        trim: true
    },
    categoryDescription: {
        type: String,
        require: true,
        trim: true
    },
    subCategory: [{
        type: Schema.Types.ObjectId,
        ref: "SubcategoryList"
    }]// karon eta subcategory er array hobe
})

module.exports = mongoose.model("CategoryList", categorySchema)
// Compare this snippet from controllers/categoryCtrl.js: