module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define("Inventory", {
        productName: DataTypes.STRING,
        currentQuantity: DataTypes.INTEGER,
        weeklyQuantity: DataTypes.INTEGER
    });
    return Inventory;
};