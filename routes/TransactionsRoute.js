const express = require("express");
const isMoment = require("moment");
const Transaction = require("../models/Transactions");
const router = express.Router();

router.post("/add-transaction", async function (req, res) {
  try {
    const newtransaction = new Transaction(req.body);
    await newtransaction.save();
    res.send("Transaction Added Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});


router.post("/edit-transaction", async function (req, res) {
  try {
    await Transaction.findOneAndUpdate({_id:req.body.transactionId},req.body.payload)
    res.send("Transaction Updated Successfully");
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});


router.post("/delete-transaction", async function (req, res) {
  try {
    await Transaction.findOneAndDelete({_id:req.body.transactionId},)
    res.send("Transaction Deleted Successfully");
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});


router.post("/get-all-transactions", async (req, res) => {
  const { frequency, selectedRange,type } = req.body;
  try {
    const transactions = await Transaction.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: isMoment()
                .subtract(Number(req.body.frequency), "d")
                .toDate(),
            },
          }
        : {
            date: {
              $gte: selectedRange[0],
              $lte: selectedRange[1],
            },
          }),
      userid: req.body.userid,
      ...(type!=='all' && {type})
    });
    res.send(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
