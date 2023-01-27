const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
  userid:{ type: String, require: true },
  amount: { type: Number, require: true },
  type: { type: String, require: true },
  category: { type: String, require: true },
  reference: { type: String, require: true },
  description: { type: String, require: true },
  date: { type: Date, require: true },
});

const transactionModel = mongoose.model("Transaction", transactionSchema);
module.exports = transactionModel;
