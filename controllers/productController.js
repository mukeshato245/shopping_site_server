const { rawListeners } = require("../models/productModel")
const Product = require("../models/productModel")

// add product
exports.addProduct = async (req, res) => {
    let product = new Product({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        count_in_stock: req.body.count_in_stock,
        category: req.body.category,
        product_image: req.file.path
    })
    product = await product.save()
    if (!product) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(product)
}

// view product
exports.viewProducts = async (req, res) => {
    let products = await Product.find().populate('category', 'category_name')
    // .sort([['createdAt',1]])
    // .limit(8)
    // .skip(2)
    if (!products) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(products)
}

// view product details
exports.productDetails = async (req, res) => {
    let product = await Product.findById(req.params.product_id).populate('category', 'category_name')
    if (!product) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(product)
}

// update product
exports.updateProduct = async (req, res) => {
    let product = await Product.findByIdAndUpdate(req.params.id,{
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        count_in_stock: req.body.count_in_stock,
        category: req.body.category,
        rating: req.body.rating
        
    },
    {new:true})
    if(!product){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(product)
}

// delete product
exports.deleteProduct = async (req, res) => {
    let product = await Product.findByIdAndDelete(req.params.id)
    if(!product){
        return res.status(400).json({error:"Product not found"})
    }
    return res.status(200).json({message:"Product deleted successfully"})
}

// find by category
exports.findProductbyCategory = async (req,res) => {
    let products = await Product.find({category: req.params.category_id})
    if(!products){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(products)
}

// filter product
exports.filterProduct = async (req, res) =>{
    let sortby = req.query.sortby ? req.query.sortby : '_id'
    let order = req.query.order ? req.query.order : '1'
    let limit = req.query.limit ? Number(req.query.limit) : 99999999999
    let skip = req.query.skip ? Number(req.query.skip) : 0
    let Args = {}
    for(let key in req.body.filters){
        if(req.body.filters[key].length>0){

            if(key==='category'){
                Args[key] = req.body.filters[key]
            }
            if(key === 'product_price'){
                Args[key] = {
                    $gte : req.body.filters[key][0],
                    $lte : req.body.filters[key][1]
                }
            }
        }
    }

    let filteredProduct = await Product.find(Args)
    .sort([[sortby, order]])
    .limit(limit)
    .skip(skip)

    if(!filteredProduct){
        return res.status(400).json({error:"something went wrong"})
    }
    res.status(200).json({
        filteredProduct,
        size: filteredProduct.length
    })
}

// related products
exports.relatedProducts = async(req,res)=>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return res.status(400).json({error:"something went wrong"})
    }
    let relatedProducts = await Product.find({
        category: product.category,
        _id: {$ne: product._id}
    })
    .sort([['createdAt',1]])
    .limit(4)
    if(!relatedProducts){
        return res.status(400).json({error:"something went wrong"})
    }
    else{
        res.send(relatedProducts)
    }
}