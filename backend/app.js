const express = require("express")
require("dotenv").config()
const bodyParser = require("body-parser")
const sequelize = require('./util/database')
const cors = require("cors")
const authRoutes = require('./routes/auth')
const expenseRoutes = require('./routes/expense')
const purchageRoutes = require('./routes/purchage')
const User = require("./models/user")
const Expense = require("./models/expense")
const Order = require("./models/orders")


const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(authRoutes)
app.use("/expense", expenseRoutes)
app.use("/purchage", purchageRoutes)

const PORT = process.env.PORT || 5000

User.hasMany(Expense);
Expense.belongsTo(User)

User.hasMany(Order);
Order.belongsTo(User)

sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is running at port ${PORT}`);
        })
    })
    .catch(err => {
        console.log(err);
    })
