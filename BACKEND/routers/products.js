const { Product } = require("../models/product");
const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

// image upload and storage destination
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

// getting all products and filtering products by categories using query parameters
router.get(`/`, async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  const productList = await Product.find(filter).populate("category");
  if (!productList) {
    res.status(500).json({
      success: false,
    });
  }
  res.send(productList);
});

// Get featured products by count
router.get(`/get/featured/:count`, async (req, res) => {
  try {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({ isFeatured: true }).limit(count);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
});

// Get count of products
router.get(`/count`, async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    res.status(200).json({
      productCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
});

router.post(`/`, uploadOptions.single("image"), async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send("Invalid category");
  }
  const file = req.file;
  if (!file) {
    return res.status(400).send("No image in request");
  }
  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: `${basePath}${fileName}`, // for example "http://localhost:3000/public/uploads/image-232323",
    images: req.body.images,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });
  await product.save();
  if (!product) {
    res.status(500).send("the product cannot be created");
  }
  res.send(product);
});
// upload images product gallery
router.put(
  `/gallery-images/:id`,
  uploadOptions.array("images", 10),
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).send("Invalid Product Id");
    }
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    if(files){
      files.map(file =>{
        imagesPaths.push(`${basePath}${file.filename}`);
      })

    }
    let product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        images: imagesPaths,
      },
      {
        new: true,
      }
    );
    if (!product) {
      res.status(500).send("the product cannot be updated");
    }
    res.send(product);
  }
);

// update product
router.put(`/:id`, uploadOptions.single("image"), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("Invalid Product Id");
  }
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send("Invalid category");
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400).send("Invalid Product");
  }

  const file = req.file;
  let imagePath;
  if (file) {
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    imagePath = `${basePath}${fileName}`;
  } else {
    imagePath = product.image;
  }

  let updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: imagePath,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    {
      new: true,
    }
  );
  if (!updatedProduct) {
    res.status(500).send("the product cannot be updated");
  }
  res.send(updatedProduct);
});

// Delete Product
router.delete(`/:id`, async (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        res.status(200).json({ success: true, message: "product is deleted" });
      } else {
        res.status(404).json({ success: false, message: "product not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        error: err,
      });
    });
});

// Get product by Id
router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) {
    res.status(500).json({
      message: "the product with the given ID was not found",
    });
  }
  res.send(product);
});
module.exports = router;
