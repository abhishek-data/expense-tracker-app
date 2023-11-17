const Expense = require('../models/expense')
const User = require('../models/user')
const sequelize = require('../util/database')

exports.getExpense = async (req, res, next) => {
    try {
        const expenses = await Expense.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'DESC']] })
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." })
    }
}

exports.addExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { expenseAmount, description, category } = req.body
        await Expense.create({ expenseAmount, description, category, UserId: req.user.id }, { transaction: t })
        await User.update(
            { totalExpenses: expenseAmount + req.user.totalExpenses },
            { where: { id: req.user.id }, transaction: t },
        );
        await t.commit();
        res.status(200).json({ message: "Expense added sucessfully." })
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: "Internal Server error." })
    }
}

exports.deleteExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const id = req.params.id
        const expense = await Expense.findByPk(id)
        await Expense.destroy({ where: { id: id, userId: req.user.id } }, { transaction: t })
        await User.update(
            { totalExpenses: req.user.totalExpenses - expense.expenseAmount },
            { where: { id: req.user.id }, transaction: t }
        );
        await t.commit();
        res.status(200).json({ message: "Expense Deleted sucessfully" })
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: 'Internal server Error.' })
    }
}

exports.updateExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const id = req.params.id
        const updatedExpense = req.body

        const expense = await Expense.findByPk(id)
        if (!expense) {
            res.status(404).json({ error: "Expense Not Found" })
        }
        if (expense.UserId !== req.user.id) {
            return res.status(403).json({ error: "Permission Denied." })
        }
        await User.update(
            { totalExpenses: updatedExpense.expenseAmount + req.user.totalExpenses - expense.expenseAmount },
            { where: { id: req.user.id }, transaction: t }
        );
        await t.commit();
        await expense.update({ ...updatedExpense, UserId: req.user.id }, { transaction: t })
        res.status(200).json({ message: "Expense Updated Sucessfully" })
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: "Internal Server Error." })
    }
}





