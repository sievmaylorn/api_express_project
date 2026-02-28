import cloudinary from "../configs/cloudinary.js";
import * as ProductModel from "../models/products.model.js";

export const createProductController = async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  try {
    let images_url = null;
    let public_id = null;

    if (req.file) {
      const up = await new Promise((resolve, rejects) => {
        cloudinary.uploader
          .upload_stream({ folder: "product_image" }, (error, result) => {
            if (error) rejects(error);
            else resolve(result);
          })
          .end(req.file.buffer);
      });
      images_url = up.secure_url;
      public_id = up.public_id;
    }

    const result = await ProductModel.createProduct(
        name,
        description,
        price,
        stock,
        category,
        images_url,
        public_id
    )

    res.status(201).json({
        message:"create product is success..",
        data:result.rows[0]
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error Server",
    });
  }
};

export const getAllProductController = async (req, res) =>{
  try{
    const result = await ProductModel.getAllproduct()
    res.status(200).json({
      message:"Gett all Products",
      data:result.rows
    })
  }catch{
    console.log(err);
    res.status.json({
      message:"Error Server meas sne ...><"
    })
    
  }
}


export const getOneproductController = async (req,res) =>{
  const id = req.params.id

  try{
    const result = await ProductModel.getOneproduct(id)
    res.status(200).json({
      message:"Get One Product",
      data:result.rows[0]
    })
  }catch{
    console.log(err);
    res.status(500).json({
      message:"Error Server sweet love ...! ><",
    })
    

  }
}

export const updateProductsController = async (req, res) => {
    const id = req.params.id;
    const { name, description, price, stock, category } = req.body;

    try {
        const checkproducts = await ProductModel.getOneproduct(id);
        if (!checkproducts.rows.length) {
            res.status(404).json({
                message: "No Product",
            });
        }

        let image_url = checkproducts.rows[0].image_url;
        let public_id = checkproducts.rows[0].public_id;

        if (req.file) {
            if (image_url) {
                await cloudinary.uploader.destroy(public_id);
            }

            const up = await new Promise((resolve, rejects) => {
                cloudinary.uploader
                    .upload_stream({ folder: 'product_image' }, (error, result) => {
                        if (error) rejects(error);
                        else resolve(result);
                    })
                    .end(req.file.buffer);
            });

            image_url = up.secure_url;
            public_id = up.public_id;
        }

        const result = await ProductModel.updateProduct(
            id,
            name,
            description,
            price,
            stock,
            category,
            image_url,
            public_id,
        );

        res.status(201).json({
            message: "Update Product Is Successfullt...",
            data: result.rows[0],
        });

    } catch (err) {
        console.log(err);
        res.status.json({
            message: "Error Server...!",
        });
    }
};