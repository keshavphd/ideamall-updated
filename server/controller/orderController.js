import { Types } from "mongoose";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";
import dotenv from "dotenv";
import Stripe from "../configuration/stripePayment.js";
dotenv.config();

const paymentCod = async (req, res) => {
  try {
    const userId = req.userId;
    const { listItems, totalAmount, addressId, subTotalAmount } = req.body;
    const payLoad = listItems?.map((a) => {
      return {
        userId: userId,
        orderId: `ORDERID-${new Types.ObjectId()}`,
        productId: a?.productId?._id,
        productDetails: {
          name: a?.productId?.name,
          image: a?.productId?.image,
        },
        paymentId: "",
        paymentStatus: "COD",
        deliveryAddress: addressId,
        subTotalAmount: subTotalAmount,
        totalAmount: totalAmount,
      };
    });
    const generatesOrder = await Order.insertMany(payLoad);
    const removeCartItem = await Cart.deleteMany({ userId: userId });
    const updateUser = await User.updateOne(
      { _id: userId },
      { shopping_cart: [] }
    );
    res.status(200).json({
      msg: "Ordered successfully",
      error: false,
      success: true,
      data: generatesOrder,
    });
  } catch (error) {
    return res.json({
      msg: "Unable to Order",
      error: true,
      success: false,
    });
  }
};

const paymentOnline = async (req, res) => {
  try {
    const userId = req.userId;
    const { listItems, totalAmount, addressId, subTotalAmount } = req.body;
    const user = await User.findById(userId);

    const line_items = listItems?.map((a) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: a?.productId?.name,
            metadata: {
              product_id: a?.productId?._id,
            },
          },
          unit_amount: a?.productId?.price * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: a?.quantity,
      };
    });
    // console.log(line_items);

    const params = {
      payment_method_types: ["card"],
      line_items: line_items,
      submit_type: "pay",
      mode: "payment",
      customer_email: user.email,
      metadata: {
        userId: userId,
        addressId: addressId,
      },
      success_url: `${process.env.FRONTEND_URL}/successes`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };
    //   return {
    //     price_data: {
    //       currency: "usd",
    //       product_data: {
    //         name: a?.productId?.name,
    //         metadata: {
    //           product_id: a?.productId?._id,
    //         },
    //       },
    //       unit_amount: a?.productId?.price ,
    //     },
    //   //   adjustable_quantity: {
    //   //     enabled: true,
    //   //     minimum: 1,
    //   //   },
    //     quantity: a?.quantity,
    //   };
    console.log("gyh", params);

    const session = await Stripe.checkout.sessions.create(params);
    const removeCartProduct = await Cart.deleteMany({ userId });
      
    console.log("session",session);
    
    return res.status(200).json(session);
  } catch (error) {
    return res.status(500).json({
      msg: "Unable to Order",
      error: true,
      success: false,
    });
  }
};

const getordeRProductItems = async ({
  lineItems,
  userId,
  addressId,
  paymentId,
  payment_status,
}) => {
  const productLists = [];
  if (lineItems?.data?.length) {
    for (const items of lineItems.data) {
      const product = await Stripe.products.retrieve(items.price.product);
      const payLoad = {
        userId: userId,
        orderId: `ORDERID-${new Types.ObjectId()}`,
        productId: product.metadata.productId,
        productDetails: {
          name: product.name,
          image: product.image,
        },
        paymentId: paymentId,
        paymentStatus: payment_status,
        deliveryAddress: addressId,
        subTotalAmount: Number(items.amount_total / 100),
        totalAmount: Number(items.amount_total / 100),
      };
      productLists.push(payLoad);
    }
  }
  return productLists;
};

const webhooKstripe = async (req, res) => {
  const event = req.body;
  const endPointScret = process.env.STRIPE_ENDPOINT_WEBHOOK;
  // console.log("event",event);

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const lineItems = await Stripe.checkout.sessions.listLineItems(
        session.id
      );
      const userId = session.metadata.userId;
      const ordeRproduct = await getordeRProductItems({
        lineItems: lineItems,
        userId: userId,
        addressId: session.metadata.addressId,
        paymentId: session.payment_intent,
        payment_status: session.payment_status,
      });
      const oreder = await Order.insertMany(ordeRproduct);

      if (Boolean(oreder[0])) {
        const removeCartItem = await User.findByIdAndUpdate(userId, {
          shopping_cart: [],
        });
        const removeCartProduct = await Cart.deleteMany({ userId });
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.json({ received: true });
};

const getOrderDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const orderList = await Order.find({ userId }).sort({ _id: -1 });
    res.status(200).json({
      msg: "Order Lists",
      data: orderList,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).json("Error in fetch orders");
  }
};

export default { paymentCod, paymentOnline, webhooKstripe, getOrderDetails };
