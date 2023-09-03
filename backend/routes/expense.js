const express = require('express')
const router = express.Router()

const expenseController = require("../controllers/expenseController")

router.get("/", expenseController.getExpense)

router.post("/add-expense", expenseController.addExpense)

router.put("/update-expense/:id", expenseController.updateExpense)

router.delete("/delete-expense/:id", expenseController.deleteExpense)

module.exports = router