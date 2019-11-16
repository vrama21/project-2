module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define("Inventory", {
        productName: DataTypes.STRING,
        currentQuanity: DataTypes.INTEGER,
        weeklyQuanity: DataTypes.INTEGER
    });
    return Inventory;
};