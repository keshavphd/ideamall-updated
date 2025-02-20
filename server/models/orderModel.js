import { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      ref: "User",
    },
    orderId: {
      type: String,
      required: [true, "provide orderId"],
      unique: true,
    },
    productId: {
      type: Schema.ObjectId,
      ref: "product",
    },
    productDetails: {
      name: String,
      image: Array,
    },
    paymentId: {
      type: String,
      default: "",
    },
    paymentStatus: {
      type: String,
      default: "",
    },
    deliveryAddress: {
      type: String,
      default: "",
    },
    subTotalAmount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    invoiceReceipt: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Order = new model("orders", orderSchema);

export default Order;
