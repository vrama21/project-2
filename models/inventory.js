module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define("Inventory", {
        productName: DataTypes.STRING,
        currentQuantity: DataTypes.INTEGER,
        weeklyQuantity: DataTypes.INTEGER,
        price: DataTypes.DECIMAL(4, 2),
        imageURL: DataTypes.STRING
    });

    Inventory.associate = function (models) {
        Inventory.belongsToMany(models.Order, {
            through: 'InventoryOrders',
            as: 'orders',
            foreignKey: 'productId',
            otherKey: 'orderId'
        });
    };

    return Inventory;
};