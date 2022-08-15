import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: false,
    },
    quantity: {
      type: Number,
      required: true,
      unique: false,
    },
    price: {
      type: Number,
      required: true,
    },
    order_type: String,
  });

export default model("Command", schema);
