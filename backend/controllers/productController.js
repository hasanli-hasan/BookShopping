import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';


//@desc Fetch all products
//@route GET /api/products
//@access Public

const getProducts =asyncHandler (async (req, res) => {
    const products = await Product.find({});
    res.json(products)
})


//@desc Fetch single product
//@route GET /api/products/:id
//@access Public

const getProductById =asyncHandler (async (req, res) => {
    const product =await Product.findById(req.params.id);
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})

//@desc Delete a product
//@route DELETE /api/products/:id
//@access Private/Admin

const deleteProduct =asyncHandler (async (req, res) => {
    const product =await Product.findById(req.params.id);
    if(product){
        await product.remove();
        res.json({message:'Product removed successfully'})
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})

//@desc Create a product
//@route POST /api/products/
//@access Private/Admin

const createProduct =asyncHandler (async (req, res) => {
   const product = new Product({
       name:'sample name',
       price:0,
       user:req.user._id,
       image:'images/sample.jpg',
       brand:'sample brand',
       category:'sample category',
       countInStock:0,
       description:'sample description'
   });

   const createdProduct = await product.save();
   res.status(201).json(createdProduct)
});



//@desc Update a product
//@route PUT /api/products/:id
//@access Private/Admin

const updateProduct =asyncHandler (async (req, res) => {
    
    const {
        name, 
        description, 
        image, 
        price,
        brand,
        category,
        countInStock
     } = req.body;
    
     const product = await Product.findById(req.params.id);

     if(product){
        
        product.name=name;
        product.description=description;
        product.image=image;
        product.price=price;
        product.countInStock=countInStock;
        product.category=category;
        product.brand=brand;

        const updatedProduct = await product.save();
        res.status(201).json({updatedProduct})
 

     }else{
        res.status(404)
        throw new Error('Product Not Found')
     }

 })

export {getProducts, getProductById, deleteProduct,createProduct,updateProduct}