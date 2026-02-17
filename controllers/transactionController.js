const Transaction = require("../models/Transaction");

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.userId }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.addTransaction = async (req, res) => {
  const { type, title, amount } = req.body;

  try {
    if (!type || !title || !amount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({ error: "Type must be income or expense" });
    }

    const newTransaction = new Transaction({
      userId: req.user.userId,
      type,
      title,
      amount: Number(amount)
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateTransaction = async (req, res) => {
  const { type, title, amount } = req.body;
  const { id } = req.params;

  try {
    const transaction = await Transaction.findOne({ _id: id, userId: req.user.userId });
    
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { type, title, amount: Number(amount) },
      { new: true }
    );

    res.json(updatedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findOne({ _id: id, userId: req.user.userId });
    
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    await Transaction.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.userId });

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0);

    const balance = income - expense;

    res.json({ income, expense, balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
