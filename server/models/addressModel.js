import { Schema, model } from "mongoose";
// "src":"/(.*)",

const addressSchema = new Schema(
  {
    addresses: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    pincode: {
      type: String,
    },
    contry: {
      type: String,
    },
    mobile: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    userId:{
      type:Schema.ObjectId,
      default:""
    }
  },
  { timestamps: true }
);
const Address = new model("address", addressSchema);

export default Address;
