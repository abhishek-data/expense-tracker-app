const Expense = require('../models/expense')

exports.getExpense = async (req, res, next) => {
    try {
        const expenses = await Expense.findAll()
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." })
    }
}

exports.addExpense = async (req, res, next) => {
    try {
        const { expenseAmount, description, category } = req.body
        await Expense.create({ expenseAmount, description, category })
        res.status(200).json({ message: "Expense added sucessfully." })
    } catch (error) {
        res.status(500).json({ error: "Internal Server error." })
    }
}

exports.deleteExpense = async (req, res, next) => {
    try {
        const id = req.params.id
        const expense = await Expense.findByPk(id)
        if (!expense) {
            return res.status(404).json({ error: "Expense Not Found" })
        }
        await expense.destroy()
        res.status(200).json({ message: "Expense Deleted sucessfully" })
    } catch (error) {
        res.status(500).json({ error: 'Internal server Error.' })
    }
}

exports.updateExpense = async (req, res, next) => {
    try {
        const id = req.params.id
        const updatedExpense = req.body

        const expense = await Expense.findByPk(id)
        if (!expense) {
            res.status(404).json({ error: "Expense Not Found" })
        }
        await expense.update(updatedExpense)
        res.status(200).json({ message: "Expense Updated Sucessfully" })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." })
    }
}





