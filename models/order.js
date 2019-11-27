module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        productName: DataTypes.STRING,
        orderQuantity: DataTypes.INTEGER,
        price: DataTypes.FLOAT(4, 2)
    });
    return Order;
};