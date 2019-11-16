module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define("Inventory", {
        productName: DataTypes.STRING,
        currentQuanity: DataTypes.STRING,
        weeklyQuanity: DataTypes.STRING
    });
    return Inventory;
};