const express = require('express');

const adminController = require('../controllers/admin');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.post(
  '/addProduct',
  isAdmin,
  adminController.addProduct
);

router.get(
  '/getProducts',
  adminController.getProduct
);

router.get(
  '/getSingleProduct/:id',
  adminController.getSingleProduct
);

router.put(
  '/updateProduct/:id',
  isAdmin,
  adminController.updateProduct
);

router.delete(
  '/deleteProduct/:id',
  isAdmin,
  adminController.deleteProduct
);

module.exports = router;