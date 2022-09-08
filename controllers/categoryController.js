const Category = require('../models/categoryModel')

// add category
exports.addCategory = async (req, res) => {
    let category = await Category.findOne({category_name: req.body.category_name})
    if(!category){
        let category = new Category({
            category_name: req.body.category_name
        })
        category = await category.save()
        if(!category){
            return res.status(400).json({error: "Something went wrong"})
        }
        res.send(category)
    }
    else{
        return res.status(400).json({error:"Category already exists"})
    }
    
}

// to view category
exports.viewCategories = async (req,res) => {
    let categories = await Category.find()
    if(!categories){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(categories)
}

// view category detail
exports.categoryDetails = async (req,res)=> {
    let category = await Category.findById(req.params.id)
    if(!category){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(category)
}

// update category
exports.updateCategory = async (req, res) => {
    let category = await Category.findByIdAndUpdate
    (req.params.id, {
        category_name: req.body.category_name
    },
    {
        new: true
    })
    if(!category){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(category)
}

// delete category
exports.deleteCategory = (req, res) => {
    Category.findByIdAndRemove(req.params.id)
    .then(category=>{
        if(!category){
            return res.status(400).json({error:"Category does not exist."})
        }
        else{
            return res.status(200).json({message:"Category deleted successfully."})
        }
    })
    .catch(err=>res.status(400).json({error:err}))
}



// find() -> returns all data in array []
// find(filter) -> returns all data that mmatches filter in array {}
// findById(id) -> returns data that matches id -> return object {}
// findOne(filter) -> return data that matches filter -> returns object {}



// req.body -> through form
// req.params -> through Url
// req.query -> through Url/?