const { get } = require("mongoose")
const categorySchema = require("../models/categorySchema")
const productSchema = require("../models/productSchema")

async function categoryCtrl(req, res) {
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
// async function getAllCategoryCtrl(req, res) {
//     try {
//         const allCategory = await categorySchema.find({});

//         const enrichedCategories = await Promise.all(
//             allCategory.map(async (category) => {
//                 const subCatsWithProducts = await Promise.all(
//                     category.subCategory.map(async (subCatName) => {
//                         const products = await productSchema.find({ subCategory: subCatName });
//                         return {
//                             name: subCatName,
//                             products,
//                         };
//                     })
//                 );

//                 return {
//                     _id: category._id,
//                     categoryName: category.categoryName,
//                     categoryDescription: category.categoryDescription,
//                     subCategory: subCatsWithProducts,
//                 };
//             })
//         );

//         res.status(200).json({
//             message: "get all category with products",
//             statues: "success",
//             data: enrichedCategories,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ error: "internal server error", statues: "failed" });
//     }
// }

async function getSingleCategoryCtrl(req, res) {
    const { id } = req.params //we need to use params when we need id. 
    const getSingleCategory = await categorySchema.findOne({ _id: id })

    res.status(200).json({
        message: "get single category",
        statues: "success",
        data: getSingleCategory
    })
}

// async function updateSingleCategoryCtrl(req, res) {
//     try {
//         const { id } = req.params
//         console.log(id)
//         const { categoryName, categoryDescription } = req.body
//         const updateCategory = await categorySchema.findByIdAndUpdate(id)
//         if (categoryName) {
//             updateCategory.categoryName = categoryName;
//         }
//         if (categoryDescription) {
//             updateCategory.categoryDescription = categoryDescription;
//         }

//         await updateCategory.save()
//         res.status(200).json({ message: "category updated successfully" })
//     } catch (error) {
//         res.status(401).json({ error: "internal server error", status: "failed" })
//     }
// }

async function updateSingleCategoryCtrl(req, res) {
    try {
        const { id } = req.params;
        const { categoryName, categoryDescription } = req.body;

        const updateData = {};
        if (categoryName) updateData.categoryName = categoryName;
        if (categoryDescription) updateData.categoryDescription = categoryDescription;

        const updatedCategory = await categorySchema.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category updated successfully", data: updatedCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: "failed" });
    }
}

async function deleteCategoryCtrl(req, res) {
    try {
        const { id } = req.params;
        const deletedCategory = await categorySchema.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({
            message: "Category deleted successfully",
            data: deletedCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            status: "error"
        });
    }
}


module.exports = { categoryCtrl, getAllCategoryCtrl, getSingleCategoryCtrl, updateSingleCategoryCtrl, deleteCategoryCtrl }

//hw:
//subcategory shob category r moto complete korte hobe
//controller e product upload korar shob code, shema ay product er schema ready kore ante hobe. date push kore next class a niye jaite hobe
//product - name, price, iamge