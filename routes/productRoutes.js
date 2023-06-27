const router = require("express").Router(),
    productController = require("../controllers/productController");
    
const validator = require("../middleware/validateRequest"),
    handleErrors = validator.handleErrors,
    validateProduct = validator.validateProduct;
    
//http://localhost:3000/product/createProduct
router.get("/createProduct", productController.sendUploadProductPage);
router.post("/createProduct", validateProduct, handleErrors, productController.newProductPost);

//http://localhost:3000/product/646e21237dd2f2540d9f03aa
router.get("/:product_id", productController.getProductPage);

//http://localhost:3000/product/646e21237dd2f2540d9f03aa/edit
router.get("/:product_id/edit", productController.getEditProductForm);
//http://localhost:3000/product/64833822a3c654601d72823f/update?_method=PUT&user=username
router.put("/:product_id/update", validateProduct, handleErrors, productController.updateProduct);
router.get("/:product_id/delete", productController.deleteProduct);

module.exports = router;