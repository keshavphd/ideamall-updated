import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    productId: {
      type: Schema.ObjectId,
      ref: "product",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    userId: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Cart = new model("cart", cartSchema);

export default Cart;
