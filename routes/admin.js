const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();
router.get(
  '/getsingleproduct/:id',
  adminController.getSingleProduct
);
router.put(
  '/addproduct/:id',
  isAdmin,
  adminController.updateProduct
);

router.post(
  '/addproduct',
  isAdmin,
  adminController.addProduct
);

router.get(
  '/getproducts',
  adminController.getProduct
);
router.put(
  '/addorder',
  isAuth,
  adminController.addOrder
);
router.delete(
  '/deleteproduct/:id',
  isAdmin,
  adminController.deleteProduct
);
router.get(
  '/getorders',
  isAdmin,
  adminController.getOrder
);
router.delete(
  '/deleteorder/:id',
  isAdmin,
  adminController.deleteOrder
);
router.put(
  '/updateorderstatus/:id',
  isAdmin,
  adminController.updateOrderStatus
);

module.exports = router;