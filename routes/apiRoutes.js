const db = require("../models");

module.exports = (app) => {
    app.get("/api/inventory", (req, res) => {
        db.Inventory.findAll().then((inventory) => {
            console.log(inventory);
            res.json(inventory.dataValues);
        });
    });

    app.post("/api/inventory/additem", (req, res) => {
        db.Inventory.create(req.body).then((inventory) => {
            res.json(inventory);
        });
    });

    app.delete("/api/inventory/:id", (req, res) => {
        db.Inventory.destroy({
            where: {
                id: req.params.id
            }
        }).then((inventory) => {
            res.json(inventory);
        });
    });
};