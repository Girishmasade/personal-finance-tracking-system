import Transaction from "../models/transaction.model.js";
import path from "path";
import xlsx from "xlsx";

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
      .json({ success: true, message: "Transaction added", transaction });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.find({
      isDelete: { $ne: true },
    }).sort({ date: -1 });
    if (!transaction) {
      return res.status(400).json({ message: "error to get transaction" });
    }

    return res.status(200).json({ success: true, transaction });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTransactions = async (req, res) => {
  try {
    const { id } = req.params;
    const { updateData } = req.body;

    const updateTrans = await Transaction.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    // console.log(updateTrans);

    return res.json(updateTrans);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    // console.log(req.params);

    if (!id) {
      return res.status(400).json({ message: "Transaction ID is required" });
    }

    const trashed = await Transaction.findByIdAndUpdate(
      id,
      { isDelete: true },
      {
        new: true,
      }
    );
    console.log(trashed);

    if (!trashed) {
      return res
        .status(404)
        .json({ status: false, message: "Transaction not found" });
    }

    res.status(200).json({
      status: true,
      message: `Transaction Deleted successfully.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const uploadExcelTransaction = async (req, res) => {
  try {
    // console.log(req.file);

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const filePath = path.resolve(req.file.path);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rows = xlsx.utils.sheet_to_json(sheet);
    // console.log(rows);

    const Dates = rows.map((row) =>
      new Date(row.date).toLocaleDateString("en-CA")
    );

    const checkDates = await Transaction.find({
      date: { $in: Dates },
      isDelete: { $ne: true },
    }); //it's check in database the date avilable or not
    console.log(checkDates);

    if (checkDates.length !== 0) {
      return res.status(400).json({
        success: false,
        message: `Transaction for ${checkDates
          .map((row) => row.date)
          .join(",")} This Date already exists!`,
      });
    }

    const transactions = rows.map((row) => ({
      date: new Date(row.date).toLocaleDateString("en-CA"),
      amount: Number(row.amount),
      category: row.category,
      description: row.description,
      type: row.type,
    }));

    // console.log(transactions)

    await Transaction.insertMany(transactions);

    return res.status(200).json({
      success: true,
      message: `${transactions.length} transactions imported`,
    });
  } catch (error) {
    console.error("Import failed:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getDeletedTransaction = async (req, res) => {
  try {
    const delteTransaction = await Transaction.find({ isDelete: true });
    console.log(delteTransaction);

    return res.status(200).json(delteTransaction);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const isDeleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    // console.log(req.params);

    if (!id) {
      return res.status(400).json({ message: "Transaction ID is required" });
    }

    const trashed = await Transaction.findByIdAndDelete(
      id,
      { isDelete: true },
      {
        new: true,
      }
    );
    // console.log(trashed);

    if (!trashed) {
      return res
        .status(404)
        .json({ status: false, message: "Transaction not found" });
    }

    res.status(200).json({
      status: true,
      message: `Transaction Deleted successfully.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const restoreTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const restore = await Transaction.findByIdAndUpdate(
      id,
      { isDelete: false },
      { new: true }
    );
    console.log(restore);

    if (!restore) {
      return res
        .status(404)
        .json({ status: false, message: "error in restore" });
    }

    return res
      .status(200)
      .json({ message: "Transaction restored successfully", restore });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const restoreAllTransaction = async (req, res) => {
  try {
    const restoreAll = await Transaction.updateMany(
      { isDelete: true },
      { $set: { isDelete: false } }
    );

    // console.log(restoreAll);

    if (restoreAll.modifiedCount === 0) {
      return res.status(404).json({
        message: "No transactions found to restore",
      });
    }

    return res.status(200).json({
      message: "Transactions restored successfully",
      modifiedCount: restoreAll.modifiedCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error restoring transactions",
      error: error.message,
    });
  }
};

export const deleteAllTransactions = async (req, res) => {
  try {
    const deleteAll = await Transaction.deleteMany({ isDelete: true });
    // console.log(deleteAll);
    res.status(200).json({
      success: true,
      message: "All soft-deleted transactions have been removed",
      deletedCount: deleteAll.deletedCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting transactions",
      error: error.message,
    });
  }
};
