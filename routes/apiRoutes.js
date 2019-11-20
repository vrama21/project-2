const db = require("../models");

module.exports = (app) => {
    app.put("/api/inventory", (req, res) => {
        db.Inventory.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then((inventory_item) => {
            res.json(inventory_item);
        });
    });

    app.delete("/api/inventory/:id", (req, res) => {
        console.log(req.params.id)
        db.Inventory.destroy({
            where: {
                id: req.params.id
            }
        }).then((inventory_item) => {
            res.json(inventory_item);
        });
    });
};