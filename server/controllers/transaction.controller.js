import Transaction from "../models/transaction.model.js";
import path from "path";
import xlsx from "xlsx";
import fs from 'fs'

export const addTransaction = async (req, res) => {
  try {
    const user = req.user._id;

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
      userRef: user,
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
    // console.log(req.user); done

    const transaction = await Transaction.find({
      isDelete: { $ne: true },
      userRef: req.user._id,
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
    const user = req.user._id;
    const { id } = req.params;
    const { updateData } = req.body;

    const transaction = await Transaction.findById(id);

    if (
      transaction &&
      JSON.stringify(transaction.userRef) === JSON.stringify(user)
    ) {
      const updateTrans = await Transaction.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      // console.log(updateTrans);

      return res.json({ message: "Transaction updated successfully." });
    } else {
      return res
        .status(500)
        .json({
          success: false,
          message: "Transaction updation failed due to invalid access.",
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const user = req.user._id;
    const { id } = req.params;

    // console.log(req.params);

    if (!id) {
      return res.status(400).json({ message: "Transaction ID is required" });
    }

    const trashed = await Transaction.findByIdAndUpdate(
      id,
      { isDelete: true },
      { userRef: user },
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

export const uploadExcelTransaction = async (req, res) => {
  try {
    // console.log(req.file);

    const user = req.user._id;

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
      userRef: user,
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
      userRef: user,
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
  } finally{
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
      console.log("File deleted successfully");
    }
  }
};

export const getDeletedTransaction = async (req, res) => {
  try {
    const user = req.user._id
    const delteTransaction = await Transaction.find({ isDelete: true, userRef: user });
    // console.log(delteTransaction);

    return res.status(200).json(delteTransaction);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const isDeleteTransaction = async (req, res) => {
  try {
    const user = req.user._id
    const { id } = req.params;

    // console.log(req.params);

    if (!id) {
      return res.status(400).json({ message: "Transaction ID is required" });
    }

    const trashed = await Transaction.findByIdAndDelete(
      id,
      { isDelete: true ,
        userRef: user
      },
      
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
    const user = req.user._id
    const { id } = req.params;
    const restore = await Transaction.findByIdAndUpdate(
      id,
      { isDelete: false },
      {userRef: user},
      { new: true }
    );
    // console.log(restore);

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
    const user = req.user._id
    const restoreAll = await Transaction.updateMany(
      { isDelete: true },
      {userRef: user},
      { $set: { isDelete: false } }
    );

    // console.log(restoreAll);

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
    const user = req.user._id
    const deleteAll = await Transaction.deleteMany({ isDelete: true, userRef: user});
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
