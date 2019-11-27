const db = require("../models");

module.exports = (app) => {
    app.get("/api/inventory/:id", (req, res) => {
        db.Inventory.findOne({
            where: {
                id: req.params.id
            }
        }).then((inventory_item) => {
            console.log(inventory_item);
            res.json(inventory_item);
        });
    });

    app.post("/api/inventory", (req, res) => {
        db.Inventory.create(req.body).then(inventory_item => {
            res.json(inventory_item);
        });
    });

    app.put("/api/inventory/:id", (req, res) => {
        db.Inventory.update(
            req.body, {
                where: {
                    id: req.params.id
                }
            }).then((inventory_item) => {
            res.json(inventory_item);
        });
    });

    app.delete("/api/inventory/:id", (req, res) => {
        db.Inventory.destroy({
            where: {
                id: req.params.id
            }
        }).then((inventory_item) => {
            res.json(inventory_item);
        });
    });
};