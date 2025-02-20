import { Schema, model } from "mongoose";
const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    category: [
      {
        type: Schema.ObjectId,
        ref: "category",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const SubCategory = new model("subCategory", subCategorySchema);

export default SubCategory;
