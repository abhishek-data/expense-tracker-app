const Sequelize = require("sequelize");
const sequelize = require("../util/database")

const ForgotPasswordRequest = sequelize.define("ForgotPasswordRequest", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    isactive: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})


module.exports = ForgotPasswordRequest