const express = require('express');

const orderController = require('../controllers/order');
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.put(
    '/addOrder',
    isAuth,
    orderController.addOrder
);

router.put(
    '/getOrders',
    isAdmin,
    orderController.getOrder
);

router.put(
    '/updateOrderStatus/:id',
    isAdmin,
    orderController.updateOrderStatus
);

router.delete(
    '/deleteOrder/:id',
    isAdmin,
    orderController.deleteOrder
);

router.get(
    '/myOrders/:id',
    isAuth,
    orderController.getMyOrders
);

module.exports = router;