import Transaction from "../models/transaction.model.js";

export const addTransaction = async (req, res) => {
  try {
    const { date, category, description, amount, type } = req.body;

    if (!date || !category || !description || !amount || !type) {
      return res
        .status(400)
        .json({ success: false, message: "all fields required" });
    }

    const transaction = await Transaction.create({
      date,
      category,
      description,
      type,
      amount,
    });

    // console.log(transaction);

    return res
      .status(200)
      .json({ success: true, message: "Transaction added", transaction});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.find()
    if (!transaction) {
      return res.status(400).json({message: "error to get transaction"})
    }

    return res.status(200).json({success: true, transaction})
  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, message: error.message})
  }
}

export const updateTransactions = async (req, res) => {
  try {
    const {id} = req.params
    const {updateData} = req.body
    
    const updateTrans = await Transaction.findByIdAndUpdate(id, updateData, {new: true})

    console.log(updateTrans);
    
    return res.json(updateTrans)

  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, message: error.message})
  }
}

export const deleteTransaction = async (req, res) => {
  try {
    const {id} = req.params

    console.log(req.params);

    if (!id) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }
    
    const trashed = await Transaction.findByIdAndDelete(id);
    console.log(trashed);
    

    if (!trashed) {
      return res.status(404).json({ status: false, message: "Transaction not found" });
    }

    res.status(200).json({
      status: true,
      message: `Transaction Deleted successfully.`,
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
}