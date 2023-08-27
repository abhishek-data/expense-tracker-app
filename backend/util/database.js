const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense-tracker", "root", "abhi", {
    dialect: "mysql",
    host:"localhost"
})

module.exports = sequelize