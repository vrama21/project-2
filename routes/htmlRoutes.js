const db = require("../models");

module.exports = (app) => {
    app.get("/", (req, res) => {
        res.render("index");
    })

    app.get("/inventory", (req, res) => {
        db.Inventory.findAll().then(items => {
            res.render("inventory", {
                inventory: items,
                scripts: [{
                    script: "/js/inventoryFrontEnd.js"
                }]
            });
        });
    });

    app.get("/ticket", (req, res) => {
        db.Inventory.findAll().then(items => {
            res.render("ticket", {
                inventory: items,
                scripts: [{
                    script: "/js/ticketFrontEnd.js"
                }]
            });
        });
    });

    // Render 404 page for any unmatched routes
    app.get("*", (req, res) => {
        res.render("404");
    });
};