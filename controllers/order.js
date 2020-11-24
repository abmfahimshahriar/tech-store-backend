const User = require('../models/user');
const Order = require('../models/order');


// add order
exports.addOrder = async (req, res, next) => {

    const cusName = req.body.cusName;
    const address = req.body.address;
    const contact = req.body.contact;
    const userId = req.body.userId;
    const total = req.body.total;
    const products = req.body.products.map(item => {
        return {
            title: item.title,
            count: item.count,
            total: item.total
        }
    });
    const user = await User.findById(userId);
    const order = new Order({
        cusName: cusName,
        address: address,
        contact: contact,
        creator: user,
        status: 'order placed',
        total: total,
        products: products

    });
    try {
        await order.save();
        res.status(201).json({
            message: 'order created successfully!',
            order: order
        });
    } catch (err) {
        console.log(err);
    }
};

//get orders
exports.getOrder = async (req, res, next) => {
    try {
        const orders = await Order.find();

        res.status(200).json({
            message: 'Fetched orders successfully.',
            orders: orders,
        });
    } catch (err) {
        console.log(err);
    }
};

// get my orders
exports.getMyOrders = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const orders = await Order.find({ creator: userId });

        res.status(200).json({
            message: 'Fetched orders successfully.',
            orders: orders,
        });
    } catch (err) {
        console.log(err);
    }
};

// delete order 
exports.deleteOrder = async (req, res, next) => {
    const orderId = req.params.id;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            res.status(422).json({ message: 'order was not found' });
        }
        //console.log(product);
        await Order.findByIdAndRemove(orderId);
        res.status(200).json({ message: 'Deleted order.' });
    } catch (err) {
        console.log(err);
    }
};

exports.updateOrderStatus = async (req, res, next) => {
    const orderId = req.params.id;
    let newStatus = null;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            res.status(422).json({ message: 'order not found!' });
        }
        if (order.status === 'order placed') {
            newStatus = 'order processing';
        }
        else if (order.status === 'order processing') {
            newStatus = 'order picked';
        }
        else if (order.status === 'order picked') {
            newStatus = 'order delivered';
        }
        else {
            newStatus = 'order delivered';
        }

        order.status = newStatus;
        const result = await order.save();

        res.status(201).json({ message: 'order updated!', order: result });
    } catch (err) {
        console.log(err);
    }
};