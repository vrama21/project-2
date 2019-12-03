module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        productName: DataTypes.STRING,
        orderQuantity: DataTypes.INTEGER,
        price: DataTypes.FLOAT(4, 2)
    });

    Order.associate = function (models) {
        Order.belongsToMany(models.Inventory, {
            through: 'InventoryOrders',
            as: 'products',
            foreignKey: 'orderId',
            otherKey: 'productId'
        });
    };

    return Order;
};