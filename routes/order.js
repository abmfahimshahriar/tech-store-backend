const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.put(
    '/addOrder',
    isAuth,
    adminController.addOrder
);

router.get(
    '/getOrders',
    isAdmin,
    adminController.getOrder
);

router.put(
    '/updateOrderStatus/:id',
    isAdmin,
    adminController.updateOrderStatus
);

router.delete(
    '/deleteOrder/:id',
    isAdmin,
    adminController.deleteOrder
);

router.get(
    '/myOrders/:id',
    isAuth,
    adminController.getMyOrders
);

module.exports = router;