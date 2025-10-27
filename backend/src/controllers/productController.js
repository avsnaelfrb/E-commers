import Product from "../models/Product.js"

const createProduct = async (req, res) => {
    const { name, description, stock, imageUrl, category, price } = req.body;

    try {
        if (!name || !stock || !imageUrl || !category || !price) {
            return res.status(401).json({
                message : `harap isi data dengan benar` 
            })
        }

        const newProduct = await Product.create({
          name,
          description,
          stock,
          imageUrl,
          category,
          price,
        });

        if(newProduct){
            res.status(201).json({
                _id : newProduct._id,
                price : newProduct.price,
                name : newProduct.name,
                description : newProduct.description,
                stock : newProduct.stock,
                imageUrl : newProduct.imageUrl,
                category : newProduct.category
            })
        } else {
            res.status(402).json({
                message : "Data product tidak valid"
            })
        }
    } catch(error) {
        res.status(500).json({ message : error.message })
    }
}

export {createProduct};