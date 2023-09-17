const User = require('../models/user')
const Razorpay = require('razorpay')
const Order = require("../models/orders")

// exports.getPremium = async (req, res, next) => {
//     try {
//         const rzp = new Razorpay({
//             key_id: process.env.key_id,
//             key_secret: process.env.key_secret
//         })
//         const amount = 999;
//         rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
//             if (err) {
//                 throw new Error(JSON.stringify(err))
//             }
//             req.User.createOrder({ orderId: order.id, status: "PENDING" }).then(() => {
//                 return res.status(201).json({ order, key_id: rzp.key_id })
//             }).catch(err => {
//                 throw new Error(err)
//             })
//         })
//     } catch (error) {
//         res.status(403).json({ message: "Something went wrong", error: err })
//     }
// }


exports.getPremium = async (req, res, next) => {
    try {
        const rzp = new Razorpay({
            key_id: process.env.key_id,
            key_secret: process.env.key_secret
        });
        const amount = 999;
        const createOrder = () => {
            return new Promise((resolve, reject) => {
                rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(order);
                    }
                });
            });
        };

        const order = await createOrder();
        return res.status(201).json({ order, key_id: rzp.key_id });
    } catch (error) {
        res.status(403).json({ message: "Something went wrong", error: error.message });
    }
}


exports.updatePayment = async (req, res, next) => {
    try {
        const { order_id, payment_id } = req.body;
        const order = await Order.findOne({ where: { orderid: order_id } });

        if (!order) {
            console.error('Order not found');
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.update({ paymentid: payment_id, status: 'SUCCESSFUL' });
        await req.user.update({ ispremiumuser: true });

        return res.status(202).json({ success: true, message: 'Transaction successful' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}
