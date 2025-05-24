// const instance = require('../instance.js')
const Razorpay = require('razorpay')
const crypto = require('crypto')
const paymentModel = require('../models/PaymentRoute')

// razorpay 
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
})

const checkOut = async (req, res) => {
    const { amount } = req.body
    // console.log(amount);
    const options = {
        amount: Number(amount * 100),
        currency: "INR",
    }

    const order = await instance.orders.create(options);
    // console.log(order);
    return res.status(200).json({ success: true, order })
}

const paymentVerification = async (req, res) => {
    // console.log(req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;


    const key_secret = process.env.RAZORPAY_SECRET;

    const hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);

    const generated_signature = hmac.digest('hex');


    const isAuthentic = generated_signature

    if (isAuthentic) {

        await paymentModel.create({ razorpay_order_id, razorpay_payment_id, razorpay_signature })

        return res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`);

        // return res.status(200).send("Payment signature verified successfully ✅");
    } else {
        return res.status(400).send("Invalid payment signature ❌");
    }


}



module.exports = { checkOut, paymentVerification }